const PouchDB =  require('pouchdb')
let {connection} = require('../conn')
const uuidAPIKey = require('uuid-apikey');
const bcrypt = require('bcrypt');

const postProfile = async (data,id, cb) => {
	let api_key = await uuidAPIKey.create()

	const {username, wa_number, subscribe, unsubscribe, session} = await data

	var query = connection.query(`UPDATE owner SET status=true, nomor='${wa_number}', nama='${username}', session='${session}', api_key='${api_key.apiKey}' WHERE id=${id}`, function (error, results, fields) {
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
			await connection.query(`UPDATE owner SET status=false, session='', nama='', nomor='' WHERE id=${res.id}`, (err, results, field) => {
				cb(results)
			})
		}
	})
}

const reconnectProfile = async (cb) => {
	await getProfile(async res => {
		
		if(res != undefined){
			await connection.query(`UPDATE owner SET status=false WHERE id=${res.id}`, (err, results, field) => {
				cb(results)
			})
		}
	})
}

const deleteProfile = async (cb) => {
	await getProfile(async res => {
		
		if(res != undefined){
			await connection.query(`DELETE FROM owner WHERE id=${res.id}`, (err, results, field) => {
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
	let query = connection.query(`SELECT * FROM owner WHERE username='${username}'`, function (error, results, fields) {
	  	if (error) throw error;
	  	if(results.length == 0){
	  		return cb({status:403, success:false, message:'Username / password yang anda masukan salah'})
	  	}
		bcrypt.compare(password, results[0]['password'], function(err, result) {
	  		return cb({status:403, success:false, message:'Username / password yang anda masukan salah'})
		});  	

	});	
}

const register = async (username, nomor, password,domain, lisensi, code, cb) => {
	nomor = 'kosong'
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(password, salt, function(err, hash) {
			let query = connection.query(`INSERT INTO owner SET ?`,{product_code:code, lisensi, username:username, nomor, password:hash, subscribe:'daftar', unsubscribe:'stop', domain}, function (error, results, fields) {
			  	if (error) throw error;	
			  	cb(results)
		    });
		});
	});	
}

module.exports = {register, reconnectProfile, deleteProfile, postProfile, getProfile, getProfileById, removeProfile, putProfile, isApiExist, login};


