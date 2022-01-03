const axios = require('axios')
const {connection} = require('../conn')
const {getProfile} = require('./setting')
const {getGroupById} = require('./group')
const {postCampaign, postDetailCampaign, postCampaignDetail, isCampaignDetailExist} = require('./campaign')
const postBroadcast = async ({groups, messages, url, second, judul, lampiran},cb) => {
	second =second.split(',').map(x=>+x);

	if(Array.isArray(groups)){
		groups.filter(val => {
			postCampaign({groups:val, messages, type:'broadcast', value:0, judul, lampiran:lampiran == undefined ? null:lampiran}, (resultCampaign) => {
				getProfile( async ({domain}) => {	
				groups = [groups]
				var query = connection.query(`
				SELECT *, grups.code as code, kontaks.id as kontak_id, grups.nama as nama_grup, kontaks.nama as c_nama FROM grup_details INNER JOIN kontaks ON kontaks.id = grup_details.kontak_id INNER JOIN grups ON grups.id = grup_details.grup_id WHERE grup_details.grup_id IN (${groups}) AND grup_details.status_grup='1'
				 GROUP BY grup_details.kontak_id`, async function (error, results, fields) {
			  		if (error) throw error;
			  		console.log(results)
			  		await getProfile( async (result) => {
				  			var i = 0;      
				  			var s = 0;        
							async function myLoop() {         
				  				await setTimeout(async function() {   
				  					let sapaan = await results[i].sapaan == 'none' ? "." : results[i].sapaan
				  					console.log(sapaan, 'sapaannnnnnnnnnnnnnnn')
				  					let msg = await messages.replace(/@nama/g, results[i].c_nama).replace(/@sapaan/g, sapaan).replace(/@unsubscribe/g, result.unsubscribe).replace(/@code/g, results[i].code).replace(/@grup/g, results[i].nama_grup)
					  				await axios.post(`${domain}/wa/send-bulk`, {lampiran, contact:results[i].nomor, message: `${msg}`}).then( async (result) => {
					  					await postCampaignDetail({kontak_id:results[i].kontak_id, campaign_id:resultCampaign.insertId, status:result.data.success, message_id:result.data.messageID}, (res) => {})
					  				}).catch(err => err)
									i++;  
									s++;  

									if (i < results.length) {           
									    await myLoop();             
									}                     

									if(i + 1 == second.length) s = -1;
									console.log(second.length, s, i)
								}, second.length > 1 ? second[s] * 1000 : second * 1000 )
				  			
							}
							myLoop()
			  			})
		  			})
			})
			})
		})
	} else {
		postCampaign({groups, messages, type:'broadcast', value:0, judul, lampiran:lampiran == undefined ? null:lampiran}, async (resultCampaign) => {
			getProfile( async ({domain}) => {	
				groups = [groups]
				var query = connection.query(`
				SELECT *, grups.code as code, kontaks.id as kontak_id, grups.nama as nama_grup, kontaks.nama as c_nama FROM grup_details INNER JOIN kontaks ON kontaks.id = grup_details.kontak_id INNER JOIN grups ON grups.id = grup_details.grup_id WHERE grup_details.grup_id IN (${groups}) AND grup_details.status_grup='1'
				 GROUP BY grup_details.kontak_id`, async function (error, results, fields) {
			  		if (error) throw error;
			  		console.log(results)
			  		await getProfile( async (result) => {
				  			var i = 0;      
				  			var s = 0;        
							async function myLoop() {         
				  				await setTimeout(async function() {   
				  					let sapaan = await results[i].sapaan == 'none' ? "." : results[i].sapaan
				  					console.log(sapaan, 'sapaannnnnnnnnnnnnnnn')
				  					let msg = await messages.replace(/@nama/g, results[i].c_nama).replace(/@sapaan/g, sapaan).replace(/@unsubscribe/g, result.unsubscribe).replace(/@code/g, results[i].code).replace(/@grup/g, results[i].nama_grup)
					  				await axios.post(`${domain}/wa/send-bulk`, {lampiran, contact:results[i].nomor, message: `${msg}`}).then( async (result) => {
					  					await postCampaignDetail({kontak_id:results[i].kontak_id, campaign_id:resultCampaign.insertId, status:result.data.success, message_id:result.data.messageID}, (res) => {})
					  				}).catch(err => err)
									i++;  
									s++;  

									if (i < results.length) {           
									    await myLoop();             
									}                     

									if(i + 1 == second.length) s = -1;
									console.log(second.length, s, i)
								}, second.length > 1 ? second[s] * 1000 : second * 1000 )
				  			
							}
							myLoop()
			  			})
		  			})
			})
		})
	}	
}

const getBroadcast = (cb) => {
	var query = connection.query('SELECT *, grups.id as g_id, kampanyes.id as k_id FROM kampanyes INNER JOIN grups ON grups.id = kampanyes.grup_id WHERE kampanyes.tipe = "broadcast"', function (error, results, fields) {
	  	if (error) throw error;
	  	cb(results)
	});
}
const getBroadcastById = (id, cb) => {
	var query = connection.query(`SELECT *, grups.id as g_id, kampanyes.id as k_id FROM kampanyes INNER JOIN grups ON grups.id = kampanyes.grup_id WHERE kampanyes.tipe = 'broadcast' AND kampanyes.grup_id = '${id}'`, function (error, results, fields) {
	  	if (error) throw error;
	  	cb(results)
	});
}

module.exports = {postBroadcast, getBroadcast, getBroadcastById};

