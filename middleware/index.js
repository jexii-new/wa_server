var session = require('express-session')
var {getProfile, deleteProfile} = require('../controllers/setting')
var axios = require('axios')

const auth = async (req, res, next) => {
	if(req.originalUrl == '/send-bulk' || req.originalUrl == '/connection' || req.originalUrl == '/logo' || req.originalUrl == '/start' || req.originalUrl == '/status' || req.originalUrl == '/kontak/group'){
		return next()
	}

	if(req.session.login == true){
		require('dns').resolve('lisensi.ruasdigital.id', async function(err) {
		  	if (err) {
		     	return res.redirect('/connection')
		  	} else {
		     console.log("Connected");
		     	await getProfile((results) => {
				if(results != undefined){
						const {product_code, lisensi, domain} = results
						axios.get(`https://lisensi.ruasdigital.id/api/checking?product_code=${product_code}&licence=${lisensi}&domain=${domain}`)
						.then(async result => {
							// console.log(result, 'rerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
						})
						.catch((err) => {
							console.log(err)
							// if(err.response.data.status == 401){
								deleteProfile((res) => {})
								req.session.destroy(() => console.log('lisensi salah'))
							// } 
						})
					}
				})
			}
		});	
	}


	if(req.session.login == undefined && req.originalUrl == '/login' || req.originalUrl == '/register'){
		return next()
	} 
	if(req.session.login == true){
		return next()
	}

	if(req.session.login == undefined) {
		return res.redirect('/login')
	}

}


module.exports = auth