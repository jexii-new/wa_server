const PouchDB =  require('pouchdb');
PouchDB.plugin(require('pouchdb-upsert'));
const moment = require('moment')
var axios = require('axios')
var numberVerify = require('../helper/number')
let {connection} = require('../conn');
var {getGroupsDetailWithContact, editGroupDetails} = require('./group')
var {getProfile} = require('./setting')

const postContact = async (data, cb) => {
	console.log(data)
	const {username, wa_number, address, called, group, validate} = await data
	if(validate == 'true') {
		numberVerify(wa_number, '', async (valNum) => {			
			await checkIfContactExist(valNum, async (result) => {
				if(result.length == 0){
					const post = await {nama:username, nomor:valNum, alamat:address, sapaan: called, date:new Date(), status:validate}
						await sendContactVerify(valNum, async () => {
							var query = connection.query('INSERT INTO kontaks SET ?', post, function (error, results, fields) {
							  	if (error) throw error;
							  	cb(results)
						});
					})
				} else {
					cb(result)
				}
			})
		})

	} else {
		numberVerify(wa_number, '', async (valNum) => {
		const post = await {nama:username, nomor:valNum, alamat:address, sapaan: called, date:new Date(), status:true}
			checkIfContactExist(valNum, (result) => {
				if(result.length == 0){
					var query = connection.query('INSERT INTO kontaks SET ?', post, function (error, results, fields) {
					  	if (error) throw error;
					  	cb(results)
					});
				} else {
					cb(result)
				}

			})
		})
		
	}
}

const checkIfContactExist = (nomor, cb) => {
	var query = connection.query(`SELECT * FROM kontaks WHERE nomor = "${nomor}"`, function (error, results, fields) {
	  	if (error) throw error;
	  	cb(results)
	});
}

const putContact = () => {
	
}

const removeContact = async (data, cb) => {
	const {id, _rev} = data
	
	var query = connection.query(`DELETE FROM kontaks WHERE id=${id}`, function (error, results, fields) {
	  	if (error) throw error;
	  	
	  	cb(results)
	});
}


const getContactById = async (id, cb) => {
	let query = connection.query(`SELECT * FROM kontaks WHERE id=${id}`, function (error, results, fields) {
		  if (error) throw error;
		  
		  cb(results)
	});
}

const getContact = async (cb) => {
	let query = connection.query('SELECT * FROM kontaks', function (error, results, fields) {
		  if (error) throw error;
		  
		  cb(results)
	});
}

const sendContactVerify=async (number, cb)=> {
	getProfile(async({domain, status}) => {
		if(status == null || status == undefined || status == 0 || status == '0' || status == false){
			return cb(false)
		} else {
			await axios.post(`${domain}/wa/send-bulk`, {contact:`${number}`, message:'silahkan ketik *daftar* untuk menverifikasi'}).then(results => cb(results)).catch(err => err)
		}
	})
}

const verifyContact=async(number, cb)=>{
	await checkIfContactExist(number, async(result) => {
		if(result.length > 0){
			console.log(result)
			await getGroupsDetailWithContact({c_id:result[0]['id']}, async(resGroupDetail) => {
				await resGroupDetail.filter(async val => {
					console.log(val)
					if(val.status_grup == 0){
						await editGroupDetails(val.g_d_id, () => {
							cb('success')
						})
					}
				})
			})
		} else {
			cb('failed')
		}
	})
}


module.exports = {postContact, getContact, getContactById, sendContactVerify, removeContact, verifyContact, checkIfContactExist};


