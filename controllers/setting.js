const PouchDB =  require('pouchdb')
let {connection} = require('../conn')
const uuidAPIKey = require('uuid-apikey');
const bcrypt = require('bcrypt');

const postProfile = async (data,id, cb) => {
	let api_key = await uuidAPIKey.create()

	const {username, wa_number, subscribe, unsubscribe, session} = await data

	var query = connection.query(`UPDATE owner SET session='${session}', api_key='${api_key.apiKey}' WHERE id=${id}`, function (error, results, fields) {
	  	if (error) throw error;
	  	cb(results)
	});
}

const putProfile = async (type, body, cb) => {

	if(type == 4){
		const {username, address, wa_number, subscribe, unsubscribe, id} = await body

		
		const post = { nama:username, alamat:'value', nomor:wa_number, status:true, subscribe, unsubscribe} 
		await connection.query(`UPDATE owner SET subscribe='${subscribe}', unsubscribe='${unsubscribe}' WHERE id=${id}`, (err, results, field) => {
			cb(results)
		})
	}

}

const removeProfile = async (cb) => {
	await getProfile(async res => {
		
		if(res != undefined){
			await connection.query(`UPDATE owner SET session='' WHERE id=${res.id}`, (err, results, field) => {
				cb(results)
			})
		}
	})
}

const getProfileById = async (id, cb) => {
	await db.get(id).then(async (result) => {
		cb(result)
	})
}

const getProfile = async (cb) => {
	let query = connection.query('SELECT * FROM owner', function (error, results, fields) {
	  	if (error) throw error;
	  	
	  	cb(results[0])
	});
}

const isApiExist = async (api_key, cb) => {
	let query = connection.query(`SELECT * FROM owner WHERE api_key='${api_key}'`, function (error, results, fields) {
	  	if (error) throw error;
	  	
	  	cb(results)
	});
}

const login = async (username, password, cb) => {
	
	
    	// result == true
	let query = connection.query(`SELECT * FROM owner WHERE nama='${username}'`, function (error, results, fields) {
	  	if (error) throw error;
	  	console.log(results[0]['password'], 'passworddddddddddddddddddddddddddddddddd')
	  	if(results.length == 0){
	  		return cb('failed')
	  	}
		bcrypt.compare(password, results[0]['password'], function(err, result) {
			cb(result)
		});  	

	});	
}

const register = async (username, nomor, password, cb) => {
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(password, salt, function(err, hash) {
			let query = connection.query(`INSERT INTO owner SET ?`,{nama:username, nomor, password:hash, subscribe:'dafar', unsubscribe:'stop'}, function (error, results, fields) {
			  	if (error) throw error;	
			  	cb(results)
		    });
		});
	});	
}

module.exports = {register, postProfile, getProfile, getProfileById, removeProfile, putProfile, isApiExist, login};


