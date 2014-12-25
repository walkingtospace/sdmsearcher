var mysql = require('mysql');
var connectionPool  = null;

exports.connect = function() {
	connectionPool = mysql.createPool({
		host     : 'localhost',
		user     : 'user',
		password : 'rewires1214',
		database : 'SDM_SEARCHER'
	});

	connectionPool.getConnection(function(err, connection) {
	 	if(err) {
	 		console.log("mysql database conection is error : " + err);
	 	}
	 	else {
	 	  	console.log("database connection pool is sucessfully created");
	 	  	connection.release();  //release for recycling
	 	}
	});
};

exports.getConnectionPool = function() {

	return connectionPool;
}