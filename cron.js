var cron = require('node-cron');
var {getCampaign, postCampaignDetail, isCampaignDetailExist} = require('./controllers/campaign')
var {getGroupsDetailsById} = require('./controllers/group')
var {getProfile, reconnectProfile} = require('./controllers/setting')
var moment = require('moment')
var axios = require('axios')
async function job(url){
	
    var task = cron.schedule('*/ * * * *', () =>  {   
    	let time = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}
    	getProfile(async (result) => {
    		if(result != undefined){

	    		let domain = result == undefined ? 'null' : result.domain
	    		axios.get(`${domain}/wa/status`).then(status => {
	    			
	    			if(!status){
	    				reconnectProfile(() => {})
	    			}
	    		}) 	
				getCampaign((resCamp)=> {
					resCamp.filter(val => {		
							
							if(val.tipe == 'hour'){
								getGroupsDetailsById(val.grup_id, async (res) => {
									if(res.length > 0) {
									    await res.filter(async(vals) => {
									    	if(vals.status_grup == true){

									  			let sapaan = vals.sapaan == null || undefined || 'none' ? "." : vals.sapaan
									  			let message = val['pesan'].replace(/@nama/g, vals.nama).replace(/@sapaan/g, sapaan)
												let userDate = new Date(vals.g_d_date)
												let userDateFuture  = userDate.setHours(userDate.getHours() + parseInt(val['nilai']))
												let userDateForChecking = new Date(userDateFuture).toLocaleTimeString([],time)
												let dateNow = new Date().toLocaleTimeString([], time)
										    	
										    	if(dateNow == userDateForChecking){
								  					
										    		
										  			await axios.post(`${domain}/wa/send-bulk`, {contact:vals.nomor, message}).then(results => {}).catch(err => err)
										  		}
									    	}
									    })
									}
								})
							}

							if(val.tipe == 'minutes'){
								getGroupsDetailsById(val.grup_id, async (res) => {
								

									if(res.length > 0) {
									    await res.filter(async(vals) => {
									    	if(vals.status_grup == true){

									  			let sapaan = vals.sapaan == null || undefined || 'none' ? "." : vals.sapaan
									  			let message = val['pesan'].replace(/@nama/g, vals.nama).replace(/@sapaan/g, sapaan)
												let userDate = new Date(vals.g_d_date)
												let userDateFuture  = userDate.setMinutes(userDate.getMinutes() + parseInt(val['nilai']))
												let userDateForChecking = new Date(userDateFuture).toLocaleTimeString([],time)
												let dateNow = new Date().toLocaleTimeString([], time)
												
										    	if(dateNow == userDateForChecking){
										    		
										    		
										  			await axios.post(`${domain}/wa/send-bulk`, {contact:vals.nomor, message}).then(results => {}).catch(err => err)
								  					
								  					await postCampaignDetail({kontak_id:vals.kontak_id, campaign_id:val.k_id}, (res) => {
								  						
								  					})
										  		} 
									    	}
											

									    })
									}
								})
							}
			
							if(val.tipe == 'days'){
								getGroupsDetailsById(val.grup_id, async (res) => {
									if(res.length > 0) {
									    await res.filter(async(vals) => {
									    	if(vals.status_grup == true){

										    	let sapaan = vals.sapaan == null || undefined || 'none' ? "." : vals.sapaan
										    	let message = val['pesan'].replace(/@nama/g, vals.nama).replace(/@sapaan/g, sapaan)
												let userDate = new Date(vals.g_d_date)
												let userDateFuture  = userDate.setDate(userDate.getDate() + parseInt(val['nilai']))
												let userDateForChecking = new Date(userDateFuture).toLocaleTimeString([],time)
												let dateNow = new Date().toLocaleTimeString([], time)
										    	
										    	if(dateNow == userDateForChecking){
								  					

										  			await axios.post(`${domain}/wa/send-bulk`, {contact:vals.nomor, message}).then(results => {}).catch(err => err)
										  		}
									    	}
									    })
									}
								})
							}
							
					})
				} )
    		}
  		})
    });
     
}	


module.exports = {job}