var session = require('express-session')

const auth = (req, res, next) => {
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