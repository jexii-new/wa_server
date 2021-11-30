const axios = require('axios')
const {connection} = require('../conn')
const {getProfile} = require('./setting')
const {getGroupById} = require('./group')
const {postCampaign, postDetailCampaign, isCampaignDetailExist} = require('./campaign')
const postBroadcast = async ({groups, messages, url, second},cb) => {
	
	if(Array.isArray(groups)){
		groups.filter(val => {
			postCampaign({groups:val, messages, type:'broadcast', value:0}, (resultCampaign) => {

			})
		})
	} else {
		postCampaign({groups, messages, type:'broadcast', value:0}, (resultCampaign) => {

		})
	}
	getProfile( async ({domain}) => {	
		groups = [...groups]
		var query = connection.query(`
		SELECT *, grups.code as code, grups.nama as nama_grup FROM grup_details INNER JOIN kontaks ON kontaks.id = grup_details.kontak_id INNER JOIN grups ON grups.id = grup_details.grup_id WHERE grup_details.grup_id IN (${groups}) AND grup_details.status_grup='1'
		GROUP BY grup_details.kontak_id`, async function (error, results, fields) {
		  		if (error) throw error;
		  		await getProfile( async (result) => {
			  			var i = 0;              
						async function myLoop() {         
			  				await setTimeout(async function() {   
			  					let sapaan = results[i].sapaan == null ? "" : results[i].sapaan
			  					console.log(sapaan, 'sapaannnnnnnnnnnnnnnn')
			  					let msg = messages.replace(/@nama/g, results[i].nama).replace(/@sapaan/g, sapaan).replace(/@unsubscribe/g, result.unsubscribe).replace(/@code/g, results[i].code).replace(/@grup/g, results[i].nama_grup)
				  				await axios.post(`${domain}/wa/send-bulk`, {contact:results[i].nomor, message: `${msg}`}).then(results => {}).catch(err => err)
								i++;                    
								if (i < results.length) {           
								    await myLoop();             
								}                       
							}, second * 1000)
						}
						myLoop()
		  				
		  			})
	  			})
			})
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

