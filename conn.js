var mysql      = require('mysql');
var connection = mysql.createConnection({
  // DATABASE

  // HOSTNAME / DATABASE SERVER
  host     : 'localhost',
  
  // NAMA DATABASE
  database : '',
  
  // USERNAME DATABASE
  user     : '',
  
  // PASSWORD DATABASE
  password : '',

});

const connect = async ()=>{
// 
	 connection.connect( async function(err) {
  	if (err) {
    	console.error('error connecting: ' + err.stack);
    	return;
  	}
  		console.log('connected as id ' + connection.threadId);
      });
}



 

module.exports = {connect, connection}

