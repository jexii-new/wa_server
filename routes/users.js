var express = require('express');
var path = require('path')
var router = express.Router();
const spin = require('../helper/spintax')
var {verifyContact, checkIfContactExist, postContact, getContact} = require('../controllers/contact')
var {getGroupByCode, postGroupsDetails, getGroupsDetailWithContact, editGroupDetails, removeContactInGroupDetail, isGroupExist, getGroupsDetailWithId} = require('../controllers/group')
var fs = require('fs')
var qrcode = require('qrcode')
const uuidAPIKey = require('uuid-apikey');
var axios = require('axios')
var { WAConnection, MessageType, ReconnectMode, MessageOptions, Mimetype  } = require('@adiwajshing/baileys')
__dirname = path.resolve();

const {getProfile, putProfile, postProfile, removeProfile, isApiExist, reconnectProfile, connect} = require('../controllers/setting')
const {updateChatReceived} = require('../controllers/campaign')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/qr', (req, res) => {
    return res.sendFile(__dirname + '/public/images/qr_code.png')
})

router.get('/logo', (req, res) => {
    return res.sendFile(__dirname + '/public/images/rds.png')
})

async function run () {
    const conn = new WAConnection() 

    conn.connectOptions = {
    /** fails the connection if no data is received for X seconds */
    maxIdleTimeMs: 5_000,
    /** maximum attempts to connect */
    maxRetries: 1000,
    /** max time for the phone to respond to a connectivity test */
    phoneResponseTime: 5_000,
    /** minimum time between new connections */
    connectCooldownMs: 4000,
    /** agent used for WS connections (could be a proxy agent) */
    agent: Agent = undefined,
    /** agent used for fetch requests -- uploading/downloading media */
    fetchAgent: Agent = undefined,
    /** always uses takeover for connecting */
    alwaysUseTakeover: true,
    /** log QR to terminal */
    logQR: true
	} 


   await conn.on('open', async () => {
	    // save credentials whenever updated
	    console.log (`credentials updated!`)
	    const authInfo = await conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
	    let user = await conn.user
	    await getProfile(async(result) => {
	    	if(result != undefined){
			    await postProfile({wa_number:user.jid, username:user.name, address:'null', status:true,  subscribe:'daftar', unsubscribe:'stop', session:JSON.stringify(authInfo, null, '\t')},result['id'], async (result) => {
				    await console.log(result)
				})
	    	} 
	    })
	   
	})
   	
 	await getProfile(async (result) => {
 		console.log(result, 'getProfile((result')
 		if(result != undefined){
	 		if(result.session != undefined && result.session.length > 0){
	 			await conn.loadAuthInfo(JSON.parse(result.session))
	 		}
 		}
 	})


    conn.on('qr', qr => {
    // Now, use the 'qr' string to display in QR UI or send somewhere
    	qrcode.toDataURL(qr)
		  .then(url => {
		      const imageBuffer = Buffer.from(
		    url.replace('data:image/png;base64,', ''),
		    'base64');
		  	fs.writeFileSync('./public/images/qr_code.png', imageBuffer);
		  })
	})

    conn.on('connecting', () => {
    	console.log('testing');
    	reconnectProfile((res) => {
    		console.log(res)
    	})
    })

    // conn.on('ws-close', ({state}) => {
    // 	console.log('connecting');
    // 	conn.connect()
    // })

    conn.on('connection-phone-change', ({connected}) => {
    	console.log('phone changessss')
    	if(!connected){
	    	reconnectProfile((res) => {
	    		console.log(res)
	    	})
    	} else {
    		connect((res) => {
    			console.log(res)
    		})
    	}
    })
    conn.clearAuthInfo();
    await conn.connect ()
    conn.autoReconnect = ReconnectMode.onConnectionLost



	conn.on("close", async ({ reason, isReconnecting }) => {
	    console.log(  "Disconnected because " + reason + ", reconnecting: " + isReconnecting )
	    if (!isReconnecting && reason == "invalid_session") {
	      	await removeProfile((res) => console.log('profile has been removed'))
	      	await getProfile( async ({domain}) => {
	      		await axios.get(`${domain}/start`)
	      	})
	      	conn.clearAuthInfo();
	    } 
	    if(isReconnecting){
	    	reconnectProfile((res) => {
	    		console.log(res)
	    	})
	    }

	    if(!isReconnecting){
	    	setTimeout(() => {
	    		conn.connect()
	    	}, 15 * 60000)
	    }
  	});

	conn.on('contacts-received', async (val) => {
		getContact((c) => {
			console.log(c)
			c.filter(({id, nomor}) => {
				getGroupsDetailWithContact({c_id:id}, async(r_g) => {
					console.log(r_g)
					r_g.filter((val) => {
							console.log(val, 'val')
						if(val.status_grup == '0'){
							console.log('sama')
							conn.sendMessage(`${nomor}@s.whatsapp.net`, 'Silahkan Ketik Daftar Untuk Menverifikasi', MessageType.text)
						}
					})
				})
			})
		})
	})

    conn.on('chat-update', async chatUpdate => {
        // `chatUpdate` is a partial object, containing the updated properties of the chat
        // received a new message
        if (chatUpdate.messages && chatUpdate.count) {
            const message = chatUpdate.messages.all()[0]

            let reg = message.message.conversation.toLowerCase()
			let a = message.message.conversation.split('#')

			await getProfile(async (profile) => {
				let contact = await message.key.remoteJid.substr(0, message.key.remoteJid.length - 15);
				const forMes = await `Ada pesan dari https://wa.me/${contact} : ${reg}`
				await conn.sendMessage(`${profile.forward}@s.whatsapp.net`, forMes, MessageType.text)
				if(reg.toLowerCase() == profile.subscribe.toLowerCase()){
					let contacts = message.key.remoteJid.substr(0, message.key.remoteJid.length - 15);
					await checkIfContactExist(contacts, async(result) => {
						if(result.length > 0){
							console.log(result, 'rrrrrrrrrrrrrrrrrrrrrrrr')
							await getGroupsDetailWithContact({c_id:result[0]['id']}, async(resGroupDetail) => {
								await resGroupDetail.filter(async val => {
									if(val.status_grup == 0){
										console.log(val, 'vallllllllllllllllllllllllllll')
										await editGroupDetails(val.g_d_id, (resEditGroup) => {
											return resEditGroup
										})
									}
								})
							})
							console.log(message.key.remoteJid, 'keyyyyyyyyyyyyyyyyyyyyyyyy')
							await conn.sendMessage(message.key.remoteJid, 'Selamat Anda Sudah Terdaftar', MessageType.text)
						} else {
							await conn.sendMessage(message.key.remoteJid, 'Anda Tidak Terdaftar', MessageType.text)
						}
					})
				}

				if(a[0].toLowerCase() == profile.subscribe.toLowerCase() && a[1]){
					getGroupByCode(a[1], async (resultGrup) => {
						if(resultGrup.length > 0){
							let contacts = await message.key.remoteJid.substr(0, message.key.remoteJid.length - 15);
							checkIfContactExist(contacts, async (result) => {
								if(result.length == 0){
									await postContact({wa_number:contacts, address:a[4], username:a[2], called:a[3]}, async (result) => {
										await postGroupsDetails({groups:resultGrup[0].id, contacts:result.insertId},async (res) => {
											await conn.sendMessage(message.key.remoteJid, `Selamat ${a[3]} ${a[2]} anda sudah Terdaftar di grup ${resultGrup[0]['nama']}`, MessageType.text)
										})
									})
								} else {
									await conn.sendMessage(message.key.remoteJid, `Maaf ${a[3] == undefined ? '' : a[3]} ${a[2]} anda sudah Terdaftar `, MessageType.text)
								}
							})
						} else {
							await conn.sendMessage(message.key.remoteJid, `Maaf ${a[3] == undefined ? '' : a[3]} ${a[2]}  grup tidak ada`, MessageType.text)
						}
					})
				}	

				if(a[0].toLowerCase() == profile.unsubscribe.toLowerCase() && a[1]){
					getGroupByCode(a[1], async (resultGrup) => {
						if(resultGrup.length > 0){
							let contacts = message.key.remoteJid.substr(0, message.key.remoteJid.length - 15);
							checkIfContactExist(contacts, async (result) => {
								if(result.length != []){
									getGroupsDetailWithId({g_id:resultGrup[0].id, c_id:result[0].id}, (result) => {
										if(result[0] != undefined){
											removeContactInGroupDetail({groups:result[0].id}, async (result) => {
												await conn.sendMessage(message.key.remoteJid, `anda sudah berhasil keluar dari grup ${resultGrup[0]['nama']}`, MessageType.text)
											})
										} else {
											conn.sendMessage(message.key.remoteJid, `anda belum terdaftar di grup ${resultGrup[0]['nama']}`, MessageType.text)

										}
									})
								} else {
									await conn.sendMessage(message.key.remoteJid, `Maaf anda Tidak Terdaftar di grup ${resultGrup[0]['nama']}`, MessageType.text)
								}
							})
						} else {
							await conn.sendMessage(message.key.remoteJid, `Maaf  grup tidak ada`, MessageType.text)
						}
					})
				}
			})
		    
        } else {
        	if(await chatUpdate.messages != undefined && chatUpdate.messages.all() != undefined){
        		const message = chatUpdate.messages.all()[0]
        		console.log(message.key.id, message.status, 'get better')
        		updateChatReceived(message.key.id, message.status, (res) => {
        			console.log(res.insertId, 'testttttttttttttttttttttttttt')
        		})
        	}
        } // see updates (can be archived, pinned etc.)
    })

	router.get('/close', async (req, res,next) => {
		console.log(conn.user)
		await conn.close()
		await conn.clearAuthInfo();

		await conn.on ('open', async () => {
		    // save credentials whenever updated
		    console.log (`credentials updated!`)
		    const authInfo = await conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
		    let user = await conn.user
		    await getProfile(async(result) => {
		    	if(result != undefined){
				    await postProfile({wa_number:user.jid, username:user.name, address:'null', status:true,  subscribe:'daftar', unsubscribe:'stop', session:JSON.stringify(authInfo, null, '\t')},result['id'], async (result) => {
					    await console.log(result)
					})
		    	} 
		    })
		   
		})

		await conn.on('qr', qr => {
	    // Now, use the 'qr' string to display in QR UI or send somewhere
	    	qrcode.toDataURL(qr)
			  .then(url => {
			      const imageBuffer = Buffer.from(
			    url.replace('data:image/png;base64,', ''),
			    'base64');
			  	fs.writeFileSync('./public/images/qr_code.png', imageBuffer);
			  })
		})

		await conn.connect()
		res.send('berhasil')
	   	
		
	})

	router.post('/send-bulk', async (req, res, next) => {  
		spin(req.body.message, async (message) => {
			if(req.body.lampiran != undefined){
				const ext = path.extname(__dirname + `/public/campaign/${req.body.lampiran}`)
				if(ext == '.mp4' || ext == '.3gp'){
					const response = await conn.sendMessage(`${req.body.contact}@s.whatsapp.net`,  fs.readFileSync(`${__dirname + `/public/campaign/${req.body.lampiran}`}`), MessageType.video, { caption: message });
				    return res.send({messageID:response.key.id, success:true, status:200});
				} 
				if(ext.toLowerCase() == '.mp3'){
					const response = await conn.sendMessage(`${req.body.contact}@s.whatsapp.net`,  fs.readFileSync(`${__dirname + `/public/campaign/${req.body.lampiran}`}`), MessageType.audio, { mimetype: Mimetype.mp4Audio });
				    return res.send({messageID:response.key.id, success:true, status:200});	
				}
				if(ext.toLowerCase() == '.png' || ext.toLowerCase() == '.jpg' || ext.toLowerCase() == '.jpeg') {
					const response = await conn.sendMessage(`${req.body.contact}@s.whatsapp.net`,  fs.readFileSync(`${__dirname + `/public/campaign/${req.body.lampiran}`}`), MessageType.image, { caption: message });
				    return res.send({messageID:response.key.id, success:true, status:200});	
				}
				if(ext.toLowerCase() == '.pdf' || ext.toLowerCase() == '.doc' || ext.toLowerCase() == '.docx' || ext.toLowerCase() == '.xlsx' || ext.toLowerCase() == '.xls' || ext.toLowerCase() == '.zip' ){
					const response = await conn.sendMessage(`${req.body.contact}@s.whatsapp.net`,  fs.readFileSync(`${__dirname + `/public/campaign/${req.body.lampiran}`}`), MessageType.document, { mimetype:Mimetype+'.'+ext, caption: message });
				    return res.send({messageID:response.key.id, success:true, status:200});	
				}
			}
			if(req.body.contact != undefined){
			    const response = await conn.sendMessage(`${req.body.contact}@s.whatsapp.net`, message, MessageType.text);
				await console.log(response.key.id, 'llllllllllllllllllllllllllllllllllllllllllllllllllll')
				return res.send({messageID:response.key.id, success:true, status:200});	
			}
			else {
				console.log('gagal')
				return res.send({messageID:null, success:false, status:204})
			}
		})
	})
}
// run in main file
// connectToWhatsApp ()
// .catch (err => console.log("unexpected error: " + err) ) // catch any errors


module.exports = {router, run};
