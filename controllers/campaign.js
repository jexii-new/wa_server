const PouchDB =  require('pouchdb')
const Plugin =  require('pouchdb-find')
const {getGroupById} = require('./group')

PouchDB.plugin(Plugin)
let {connection} = require('../conn')

const removeCampaign = async (data, cb) => {
	const {_id, _rev} = data

	await dbs.remove(_id, _rev).then((res) => cb(res))
}

const postCampaign = async ({groups, messages, type, value, judul, lampiran},cb) => {
	let post = ''
	if(lampiran != null || lampiran != undefined){
		post = {grup_id:groups, judul, pesan:messages, tipe:type,lampiran:lampiran, nilai:value, createdAt:new Date()}
	} else {
		post = {grup_id:groups, judul, pesan:messages, tipe:type, nilai:value, createdAt:new Date()}

	}
	var query = connection.query('INSERT INTO kampanyes SET ?', post, function (error, results, fields) {
	  	if (error) throw error;
	  	cb(results)
	});

}

const isCampaignExistWithGroup = (groups, nilai,tipe, cb) => {
	 let query = connection.query(`SELECT * FROM kampanyes WHERE grup_id='${groups}' AND nilai='${nilai}' AND tipe='${tipe}'`, async function (error, results, fields) {
	  	if (error) throw error;
	  	
	  	await cb(results)
	});	

}

const getCampaign = async (cb) => {
	var query = connection.query('SELECT *, grups.id as g_id, kampanyes.id as k_id FROM kampanyes INNER JOIN grups ON grups.id = kampanyes.grup_id WHERE kampanyes.tipe != "broadcast"', function (error, results, fields) {
	  	if (error) throw error;
	  	cb(results)
	});

}

const getCampaignByGroupId = async (id, cb) => {
	var query = connection.query(`SELECT *, grups.id as g_id, kampanyes.id as k_id FROM kampanyes INNER JOIN grups ON grups.id = '${id}' AND kampanyes.grup_id = '${id}' WHERE kampanyes.tipe != "broadcast"`, function (error, results, fields) {
	  	if (error) throw error;
	  	cb(results)
	});

}

const getBroadcastByGroupId = async (id, cb) => {
	var query = connection.query(`SELECT *, grups.id as g_id, kampanyes.id as k_id FROM kampanyes INNER JOIN grups ON grups.id = '${id}' AND kampanyes.grup_id = '${id}' WHERE kampanyes.tipe = "broadcast"`, function (error, results, fields) {
	  	if (error) throw error;
	  	cb(results)
	});

}


const removeContentOfCampaign = async ({campaign}, cb) => {
	var query = connection.query(`DELETE  FROM kampanyes WHERE kampanyes.id = ${campaign}`, function (error, results, fields) {
	  	if (error) throw error;
	  	cb(results)
	});
}

const removeContentOfCampaignDetail = async ({campaign, kontak}, cb) => {
	var query = connection.query(`DELETE FROM kampanyes_detail WHERE kampanyes_detail.campaign_id ='${campaign}'`, function (error, results, fields) {
	  	if (error) throw error;
	  	cb(results)
	});
}

const postCampaignDetail = async ({kontak_id, campaign_id, tipe, status, message_id}, cb) => {
	let post = {kontak_id, campaign_id, status, message_id}
	await isCampaignDetailExist(kontak_id, campaign_id, async (result) => {
		if(result.length == 0){
			var query = connection.query('INSERT INTO kampanyes_detail SET ?', post, function (error, results, fields) {
			  	if (error) throw error;
	
			  	cb(results)
			}); 
		}		
	})
}

const isCampaignDetailExist = async (kontak_id,campaign_id, cb) => {
	var query = connection.query(`SELECT * FROM kampanyes_detail INNER JOIN kampanyes WHERE kontak_id='${kontak_id}' AND campaign_id='${campaign_id}'`, async function (error, results, fields) {
	  	if (error) throw error;
	  	
	  	await cb(results)
	});
}



const getCampaignDetailWithContact = async (kontak_id,type, cb) => {
	if(type == 'kampanye'){
		query = connection.query(`SELECT * FROM kampanyes_detail INNER JOIN kampanyes ON kampanyes.id = kampanyes_detail.campaign_id WHERE kampanyes_detail.kontak_id='${kontak_id}' AND kampanyes.tipe != 'broadcast'`, async function (error, results, fields) {
	  	if (error) throw error;
	  	
	  	return await cb(results)
	});	
	}
	var query = connection.query(`SELECT * FROM kampanyes_detail INNER JOIN kampanyes ON kampanyes.id = kampanyes_detail.campaign_id WHERE kampanyes_detail.kontak_id='${kontak_id}' AND kampanyes.tipe = '${type}'`, async function (error, results, fields) {
	  	if (error) throw error;
	  	
	  	await cb(results)
	});	
}

const editCampaignById = async (data, cb) => {

	const {pesan, id} = await data

	console.log(data)
	var query = await connection.query(`UPDATE kampanyes SET pesan='${pesan}' WHERE id=${id}`,  function (error, results, fields) {
	  	if (error) throw error;
	  	
	  	cb(results)
	})

}

const updateChatReceived = async (message_id,status, cb) =>{
	var query = await connection.query(`UPDATE kampanyes_detail SET status='${status}' WHERE message_id ='${message_id}'`,  function (error, results, fields) {
	  	if (error) throw error;
	  	
	  	cb(results)
	})
}

module.exports = {getBroadcastByGroupId, updateChatReceived, removeContentOfCampaign,removeContentOfCampaignDetail, isCampaignExistWithGroup,editCampaignById, getCampaign, postCampaign,removeCampaign, postCampaignDetail, getCampaignByGroupId, isCampaignDetailExist, getCampaignDetailWithContact};

