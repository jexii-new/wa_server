var session = require('express-session')
var {getProfile, deleteProfile} = require('../controllers/setting')
var axios = require('axios')

const auth = async (req, res, next) => {
	if(req.originalUrl == '/send-bulk' || req.originalUrl == '/logo' || req.originalUrl == '/start' || req.originalUrl == '/status' || req.originalUrl == '/kontak/group'){
		return next()
	}

	if(req.session.login == true){

		await getProfile((results) => {
			if(results != undefined){
				const {product_code, lisensi, domain} = results
				axios.get(`https://lisensi.ruasdigital.id/api/checking?product_code=${product_code}&licence=${lisensi}&domain=${domain}`)
				.then(async result => {
					// console.log(result, 'rerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
				})
				.catch((err) => {
					console.log(err)
<<<<<<< HEAD
					// if(err.response.data.status == 401){
						deleteProfile((res) => {})
						req.session.destroy(() => console.log('lisensi salah'))
					// } 
=======
					if(err.response.data.status == 401){
						deleteProfile((res) => {})
						req.session.destroy(() => console.log('lisensi salah'))
					}
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07
				})
			}
		})
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