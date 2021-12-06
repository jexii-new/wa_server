var session = require('express-session')
var {getProfile, deleteProfile} = require('../controllers/setting')
var axios = require('axios')

const auth = async (req, res, next) => {
	if(req.session.login == true){

		await getProfile((results) => {
			if(results != undefined){
				const {product_code, lisensi, domain} = results
				axios.get(`https://lisensi.ruasdigital.id/api/checking?product_code=${product_code}&licence=${lisensi}&domain=${domain}`)
				.then(result => {
					console.log(result, 'rerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
				})
				.catch((err) => {
					console.log(err, 'errrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
					deleteProfile((res) => {})
					req.session.destroy(() => console.log('lisensi salah'))

				})
			}
		})
	}

	if(req.originalUrl == '/send-bulk' || req.originalUrl == '/logo'){
		return next()
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