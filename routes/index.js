var express = require('express');
var router = express.Router();
var {postContact, getContact, removeContact, getContactById, sendContactVerify} = require('../controllers/contact')
var {postBroadcast, getBroadcast, getBroadcastById} = require('../controllers/broadcast')
var {postProfile, putProfile, getProfile, login, register, editPassword} = require('../controllers/setting')
var {postCampaign, getBroadcastByGroupId, removeContentOfCampaignDetail, getCampaign,getCampaignByGroupId, postCampaignDetail,editCampaignById, isCampaignExistWithGroup, getCampaignDetailWithContact, removeCampaign,removeContentOfCampaign, isCampaignDetailexist} = require('../controllers/campaign')
var {postGroup, getGroupByCode,getGroupsDetailWithContact, editGroupById, removeSettingGroupById, putSubGroup, getGroupsDetailsById,getSettingGroupById, removeContactInGroupDetail, getGroupById, getGroup, getGroupsDetails, postGroupsDetails, getDetailsGroup, removeGroup, removeGroupDetail} = require('../controllers/group')
var axios = require('axios')
var differenceInMinutes = require('date-fns/differenceInMinutes')
var {calculateDate} = require('../helper/date')
var numberVerify = require('../helper/number')
var xlsx =require('node-xlsx')
var path = require('path')
__dirname = path.resolve();

/* GET home page. */
router.get('/', function(req, res, next) {
	getProfile(({domain}) => {
  		res.render('index', { title: 'Express', domain });
	})
});

// contacts
router.get('/kontak', ({body}, res, next) => getContact(async (result) => {
	getGroup(async(resGroup) => {
		await res.render('contact', {contacts:result, groups:resGroup})
	})
}))
router.get('/kontak/add', ({body}, res, next) => getContact(async (result) => {
	getGroup(async(resGroup) => {
		await res.render('contact', {add :true, contacts:result, groups:resGroup})
	})
}))
router.post('/kontak', async (req, res, next) =>{ 
	if(req.files != null){
		const workSheetsFromBuffer = await xlsx.parse(req.files.file.data);
		console.log(workSheetsFromBuffer)
		const sheet = workSheetsFromBuffer[0].data.filter(val => val.length > 0)
		console.log(sheet)
		await sheet.filter(async (val, index) => {
			if(index != 0 ){
				if( val[1] != null && val[0] != null){
					getGroupByCode(val[4], async (resultCode) => {
						await postContact({username:val[1], called:val[2], address:val[3], wa_number:val[0]}, async resPostContact => {
							if(resPostContact != false){
								await postGroupsDetails({contacts:resPostContact.insertId, groups:resultCode[0]['id'], date:new Date(new Date().setMinutes(new Date().getMinutes() + index ))}, async () => {
									return res.redirect('back')
								})
							} 
						})
					})
				}
			}
		})
		await res.redirect('back')
	} else {
		await postContact(req.body, async (val) =>  {
			if(val !=false){
				postGroupsDetails({groups:req.body.groups, contacts:val.insertId}, () => {
					res.redirect('/kontak')
				})	
			} else {
					res.redirect('/kontak')
			}
		})
	}
})
router.post('/kontak/group', async (req, res, next) => await postContact(req.body, async (valContact) =>  {
		valContact = await valContact.length == 1 ? {insertId: valContact[0]['id'], verify:true} : valContact

		await getGroupsDetailsById(req.body.group, async(result) => {
			numberVerify(req.body.wa_number, '', async (nomor) => {
				let resSame = [];
				let c = await result.filter(async res_g_d => {
						if(res_g_d.nomor == nomor) {resSame.push(res_g_d)} 
						else {
							return []
						}
					})

				if(await resSame.length > 0){
						return res.redirect(`${req.body.url}?status=failed`)
					} 
				else{
					if(valContact.verify == true){
						sendContactVerify(nomor, () =>{})
					}
					await postGroupsDetails({groups:req.body.group, contacts:valContact.insertId, validate:true}, async (val)=> {
						await getSettingGroupById(req.body.group, async (result) => {
							await result.filter(async val => {
								if(val.grup_id != undefined){
									await getGroupsDetailsById(val.grup_out_id, (result)=>{
										result.filter(val => {
											 if(val.nomor == nomor){
											 	removeContactInGroupDetail({groups:val.g_d_id}, (res) => {
											 		res.redirect(`${req.body.url}?status=success`)
											 		return res
											 	})
											 	removeContact({id:val.kontak_id}, (res) => {
											 		res.redirect(`${req.body.url}?status=success`)
											 		return res
											 	})
											 } else {
											 	return res.redirect(`${req.body.url}?status=success`)
											 }
										})
									})
								}
							}) 
						})
					return await res.redirect(`${req.body.url}/?status=success`)
					})
				}
			})
		})
	
}))
router.get('/kontak/delete/:id', async (req, res, next) => {
	await getGroupsDetailWithContact({c_id:req.params.id}, async (result) => {
			await result.filter(async val => {
				await removeContactInGroupDetail({groups:val.g_d_id}, async() => {
					await getCampaignByGroupId(val.g_id, async (resCampaign) => {
						await resCampaign.filter(async val => {
							await removeContentOfCampaignDetail({campaign:val.k_id}, async(result) => {
							})
						})
					}) 
				await removeContact({id:req.params.id}, async (val) =>  res.redirect('/kontak'))
				})
			})
			if(result.length == 0){
				await removeContact({id:req.params.id}, async (val) =>  res.redirect('/kontak'))
			}
		})

})

// groups
router.get('/group', (req, res, next) => getGroup(async (result) => await res.render('group', {groups:result})))
router.get('/group/add', (req, res, next) => getGroup(async (result) => await res.render('group', {groups:result, add:true})))
router.post('/group', async (req, res, next) => await postGroup(req.body, async (val) =>  res.redirect('/group')))
router.get('/group/delete/:id', async (req, res, next) => {
	await getGroupsDetailsById(req.params.id, async (result) => {
		await result.filter(async val => {
			await removeContactInGroupDetail({groups:val.g_d_id}, async (result) => {
				return result
			})	
		})
	})
	await getCampaignByGroupId(req.params.id, async (result) => {
		await result.filter(async val => {
			await removeContentOfCampaign({campaign : val.k_id}, async (result) => {
				return result
			})
			await removeContentOfCampaignDetail({campaign: val.k_id},  async() => {
				return result
			})
		}) 
	})

	await getBroadcastByGroupId(req.params.id, async (result) => {
		await result.filter(async val => {
			await removeContentOfCampaign({campaign : val.k_id}, async (result) => {
				return result
			})
		}) 
	})

	await getSettingGroupById(req.params.id, async(result) => {
		console.log(result, '123123123')
		if(result.length > 0){
			await result.filter(async val => {
				await removeSettingGroupById({setting_group_id:val.s_g_id}, async (result) => {
					await removeGroup({id:req.params.id}, async() => {
						await res.redirect('back')
					})
				})
			})  
		} else {
			await removeGroup({id:req.params.id}, async() => {
				await res.redirect('back')
			})
		}
	})
})
router.get('/group/:id', (req, res, next) => getGroupsDetailsById(req.params.id,async (result, val) => {
		await getContact(async (contacts) => {
			await getGroupById(req.params.id, async (resGroupsDetail) => {
		 		await res.render('group', {group:resGroupsDetail, contacts, edit:true, groups_detail:result, url:req.headers.host, grup_id:req.params.id})
			})
		})
}))

// group detail
router.get('/groups/detail/:id', (req, res, next) => getGroupsDetailsById(req.params.id,async (result, val) => {
		await getContact(async (contacts) => {
			await getGroupById(req.params.id, async (resGroupsDetail) => {
		 		await res.render('group_detail', {groups:resGroupsDetail, contacts, groups_detail:result, url:req.headers.host, grup_id:req.params.id})
			})
		})
}))
router.post('/groups/detail', async (req, res, next) => {
	if(req.files != null){
		const workSheetsFromBuffer = await xlsx.parse(req.files.file.data);
		console.log(workSheetsFromBuffer)
		const sheet = workSheetsFromBuffer[0].data.filter(val => val.length > 0)
		console.log(sheet)
		await sheet.filter(async (val, index) => {
			if(index != 0){
				if( val[1] != null && val[0] != null){
					await postContact({username:val[1], called:val[2], address:val[3], wa_number:val[0]}, async resPostContact => {
						if(resPostContact != false){
							await postGroupsDetails({contacts:resPostContact.insertId, groups:req.body.groups, date:new Date(new Date().setMinutes(new Date().getMinutes() + index ))}, async () => {
								return res
							})
						} 
					})
				}
			}
		})
		await res.redirect('back')
	} else {
		await getContactById(req.body.contacts, async (resContact) => {
			await postGroupsDetails(req.body, async (val)=> {
				await getSettingGroupById(req.body.groups, async (result) => {
					await result.filter(async val => {
						if(val.grup_id != undefined){
							await getGroupsDetailsById(val.grup_out_id, (result)=>{
								result.filter(val => {
									 if(val.nomor == resContact[0].nomor){
									 	removeContactInGroupDetail({groups:val.g_d_id}, (res) => {
									 		return res
									 	})
									 }
								})
							})
						}
					}) 
				})
			})
		})

		await res.redirect('back')

	}

})
router.post('/group_detail/delete', async (req, res, next) => await removeGroupDetail(req.body, async (val) =>  res.redirect('/groups/detail')))
router.get('/group_detail/contact/:group_detail_id', async (req, res, next) => await removeContactInGroupDetail({groups:req.params.group_detail_id}, async (val) =>  res.redirect('back')))
router.post('/group/edit', async(req, res, next) => {
	await editGroupById(req.body, async(result) => {
		await res.redirect('/group')
	})
})

// campaign
router.get('/campaign/:id', (req, res, next) => getGroupById(req.params.id, async (result) => {
	console.log(result)
	await getProfile(async (resultProfile) => {
		await getCampaignByGroupId(result[0].id, async (resCampaign) => {
			await res.render('campaign', {groups:result, campaigns:resCampaign, unsub:resultProfile == undefined ? 'stop' : resultProfile.unsubscribe})
		})
	})
}))
router.get('/campaign/:id/add', (req, res, next) => getGroupById(req.params.id, async (result) => {
	console.log(result)
	await getProfile(async (resultProfile) => {
		await getCampaignByGroupId(result[0].id, async (resCampaign) => {
			await res.render('campaign', {groups:result, add:true, campaigns:resCampaign, unsub:resultProfile == undefined ? 'stop' : resultProfile.unsubscribe})
		})
	})
}))

router.get('/campaign', (req, res, next) => getGroup(async (result) => await res.render('campaign_detail', {groups:result})))

router.post('/campaign/edit',async (req, res, next) => {
	await editCampaignById(req.body, async (result) => {
		await res.redirect('back')
	})
})
router.post('/campaign', async (req, res, next) => {
	const body = await req.body
	const file = await req.files;
	var lampiranName = null
	if(req.files != null){
		let lampiran = await req.files.lampiran;
		if(lampiran.size > 5045044){
			return res.redirect(`/campaign/${body.groups}`)
		}
		let uploadPath =await __dirname + '/public/campaign/' + req.files.lampiran.name;
		lampiranName = lampiran.name
		await lampiran.mv(uploadPath, async (err)=>{
			if(err) return res.status(500).send(err)
		})
	}
	await isCampaignExistWithGroup(body.groups, body.value, body.type, async (isCampaignExist) => {
		if(isCampaignExist.length == 0){
			await postCampaign({...body,lampiran:lampiranName}, async (resultPostCampaign) => {
				await getGroupsDetailsById((body.groups), async (resGroupsDetail) => {
					await resGroupsDetail.filter(async val => {
						await getCampaignDetailWithContact(val.kontak_id,body.type, async (result) => {
							if(result.length !=  0){
								console.log(result, 'resutllllllllllllllll')
								let message = body.messages.replace(/@nama/g, val.nama).replace(/@sapaan/g, val.sapaan)
								let sort = await  result.sort((a,b) => (a.nilai > b.nilai) ? 1 : ((b.nilai > a.nilai) ? -1 : 0));
								await sort.filter( async values => {
									if(values.nilai == body.value){
										await res.redirect(`/campaign/${body.groups}`)
									}
								})

								if((body.value - parseInt(sort[sort.length - 1]['nilai'])) < 1){
									await axios.post(`${req.protocol}://${req.headers.host}/wa/send-bulk`, {contact:val.nomor,lampiran:lampiranName, message}).then(async(result) => {
										await postCampaignDetail({kontak_id:val.kontak_id, campaign_id:resultPostCampaign.insertId,  status:result.data.success, message_id:result.data.messageID}, () => {
											return res.redirect(`/campaign/${body.groups}`)	

										})
									})
								}

								if((body.value - parseInt(sort[sort.length - 1]['nilai'])) > 0){
									await calculateDate(val.g_d_date,  async (distanceMinute, distanceDays) => {
										console.log(distanceMinute)
										if(distanceMinute > body.value && body.type == 'minutes'){
											await axios.post(`${req.protocol}://${req.headers.host}/wa/send-bulk`, {contact:val.nomor,lampiran:lampiranName, message}).then(async(result) => {
												await postCampaignDetail({kontak_id:val.kontak_id, campaign_id:resultPostCampaign.insertId,  status:result.data.success, message_id:result.data.messageID}, () => {
													return res.redirect(`/campaign/${body.groups}`)	

												})	
											})
										}

										if(distanceDays > body.value && body.type == 'days'){
											await axios.post(`${req.protocol}://${req.headers.host}/wa/send-bulk`, {contact:val.nomor,lampiran:lampiranName, message}).then(async(result) => {
												await postCampaignDetail({kontak_id:val.kontak_id, campaign_id:resultPostCampaign.insertId,  status:result.data.success, message_id:result.data.messageID}, () => {
													return res.redirect(`/campaign/${body.groups}`)		
												})	
											})
										}
									})
								}

							} else {
								await calculateDate(val.g_d_date,  async (distanceMinute, distanceDays) => {
									console.log(distanceMinute)
									let message = body.messages.replace(/@nama/g, val.nama).replace(/@sapaan/g, val.sapaan)
									console.log(`${req.protocol}://${req.headers.host}/wa/send-bulk`, lampiranName)
									if(distanceMinute > body.value && body.type == 'minutes'){
										await axios.post(`${req.protocol}://${req.headers.host}/wa/send-bulk`, {contact:val.nomor,lampiran:lampiranName, message}).then(async(result) => {
											await postCampaignDetail({kontak_id:val.kontak_id, campaign_id:resultPostCampaign.insertId,  status:result.data.success, message_id:result.data.messageID}, () => {
												
											})	
										})
									}

									if(distanceDays > body.value && body.type == 'days'){
										await axios.post(`${req.protocol}://${req.headers.host}/wa/send-bulk`, {contact:val.nomor,lampiran:lampiranName, message}).then(async(result) => {
											await postCampaignDetail({kontak_id:val.kontak_id, campaign_id:resultPostCampaign.insertId, status:result.data.success, message_id:result.data.messageID}, () => {
												return res.redirect(`/campaign/${body.groups}`)	

											})	
										})
									}
									return res.redirect(`/campaign/${body.groups}`)	
								})

							}
						})
					})
				})
			})
		} else {
			await res.redirect(`/campaign/${body.groups}`)
		}
	})
})
router.post('/campaign/delete', ({body}, res, next) => removeCampaign(body, (result) => res.redirect('/campaign')))
router.get('/campaign/content/delete/:content_id', (req, res, next) => removeContentOfCampaign({campaign:req.params.content_id}, (result) => res.redirect('back')))


// broadcast 

router.get('/broadcast', ({body}, res, next) => getGroup(async (result) => {
	getBroadcast(async (resBroadcast) => {
		await res.render('broadcast', {groups:result, broadcasts:resBroadcast})
	})
}))

router.get('/broadcast/:group_id', (req, res, next) => getGroupById(req.params.group_id, async (result) => {
	getBroadcastById(req.params.group_id, async (resBroadcast) => {
		await res.render('detail_broadcast', {groups:result, broadcasts:resBroadcast})
	})
}))

router.post('/broadcast', async (req, res, next) => {
	const body = await req.body
	const file = await req.files;
	var lampiranName = null
	if(req.files != null){
		let lampiran = await req.files.lampiran;
		if(lampiran.size > 5045044){
			
			return res.redirect(`back`)
		}
		let uploadPath =await __dirname + '/public/campaign/' + req.files.lampiran.name;
		lampiranName = lampiran.name
		await lampiran.mv(uploadPath, async (err)=>{
			if(err) return res.status(500).send(err)
		})
	}
	if(req.body.groups == undefined || null){
		await getGroup(async (result) => {
			await getBroadcast(async (resBroadcast) => {
				return await res.render('broadcast', {status:403, message:'Wajib Memilih Grup', groups:result, broadcasts:resBroadcast})
			})
		})
	} else {
		await postBroadcast({groups:req.body.groups,lampiran:lampiranName, messages:req.body.messages, url:req.headers.host, second:req.body.second, judul:req.body.judul}, (result) => result)
	// }

	await res.redirect('back')
		
	}
	// if(Array.isArray(req.body.groups)){
	// 	await req.body.groups.filter(val => {
	// 		postBroadcast({groups:val, messages:req.body.messages, url:req.headers.host, second:req.body.second}, (result) => result)
	// 	})
	// } else {
})

router.get('/pesan/:id/:tipe/:username', async(req, res)=>{
	const id = await req.params.id
	const username = await req.params.username
	const tipe = await req.params.tipe
	await getCampaignDetailWithContact(id, tipe, (result)=>{
		res.render('group_detail', {broadcast_detail:result,username, tipe })
	})
})

// owner
router.get('/setting', (req, res, next) => getProfile((result) =>  res.render('setting', {owner:result})))
router.post('/setting', (req, res, next) => postProfile(req.body, ()=>res.redirect('/setting')))
router.post('/setting/edit', (req, res, next) => putProfile(4, req.body, ()=>res.redirect('/setting')))
router.get('/setting/password', (req, res)=> res.render('setting', {password:true, owner:{}}))
router.post('/setting/password', (req, res)=> editPassword(req.body.password, (result)=>res.redirect('/setting/password?status=success')))

// setting group
router.get('/setting/group/:group_id', async (req, res, next) => getGroup(async (result, val) => {
	getGroupById(req.params.group_id, (resultGroupId) => {
		getProfile((resProf) => {
			getSettingGroupById(resultGroupId[0].id, (resGroupsDetail) => res.render('setting_group', {setting_groups:resGroupsDetail, groups:result,url:req.protocol + 's://' + req.headers.host, group:resultGroupId[0], grup_id: req.params.group_id}))
		})
	})
}))
router.get('/setting/group/delete/:setting_group_id/:group_id', (req, res, next) => removeSettingGroupById({setting_group_id:req.params.setting_group_id}, (result) =>  res.redirect(`/setting/group/${req.params.group_id}`)))

router.post('/group/sub', async (req, res, next) => await putSubGroup(req.body, async (val) =>  res.redirect('back')))

// router untuk testing
router.get("/daftar/:code", (req, res) => {
	getGroupByCode(req.params.code, (result) => {
		
	})
})


//  router auth
router.get('/login', async (req, res, next) => {
	if(req.session.login == undefined){
		await getProfile(async(result) => {
			if(result == undefined){
				await res.redirect('/register')
			} else {
				await res.render('login')
			}
		})

		
	} else {
		res.redirect('/')
	}
})
router.get('/logout', (req, res, next) => {
	req.session.destroy(() => {
		res.redirect('/login')
	})
})
router.post('/login', (req, res, next) => {
	login(req.body.username, req.body.password, (result) => {
		console.log(result,'resutllllll')
		if(result.success == false){
			res.render('login', {status:403, message:result.message})
		} else {
			req.session.login = true
			res.redirect('/')
		}
	})
})
router.get('/register', (req, res, next) => {
	getProfile((result) => {
		if(result != undefined){
			res.redirect('/login')
		} else {
			res.render('register', {url:req.protocol + '://' + req.headers.host})
		}
	})
})

router.post('/register', (req, res, next) => {
	axios.get(`https://lisensi.ruasdigital.id/api/setting?product_code=${req.body.product_code}&licence=${req.body.lisensi}&domain=${req.body.domain}`)
	.then(result => {
		register(req.body.username, `${req.body.nomor}@whatsapp.net`, req.body.password, req.body.domain, req.body.lisensi, req.body.product_code,(result) => {
		console.log(result, 'rrrrrr')
			res.redirect('/login')
		})
	})
	.catch(err => {
		if(err.response.data.errors == undefined){
			return res.render('register', {url:req.protocol + '://' + req.headers.host, status:401, message:'Kode Lisensi Tidak Terdaftar'})
		}
		res.render('register', {url:req.protocol + '://' + req.headers.host, status:401, message:err.response.data.errors.check})
	})

})

router.get('/example/grup', (req, res,next) => {
	res.sendFile(__dirname + '/public/example/grup_kontak_import.xlsx')
})


router.get('/example/kontak', (req, res,next) => {
	res.sendFile(__dirname + '/public/example/kontak-import.xlsx')
})

// tutorial
router.get('/tutorial', (req, res, next) => res.render('tutorial'))

router.get('/connection', (req, res, next) => res.render('no_connection'))
module.exports = router;
