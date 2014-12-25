var rootDirectory = process.cwd(); 
var error = require(rootDirectory + '/controllers/errorController.js'); //usage: error.response(req, res, 404);
var mysql = require(rootDirectory + '/mysql');

exports.getComment = function(req, res) {
	var data = new Array();
	var connectionPool = mysql.getConnectionPool();

	connectionPool.getConnection( function(err, connection) {
		
		var query = 'SELECT * from CHAT ORDER BY DATE DESC'; //

		connection.query( query, function(err, rows, fields) {
			if(err) {
				console.log("error: " + err); 
				res.send("ERROR");
			} 
			else {
				res.send(rows);
			}

			connection.release(); //after using, it shoule be released for recycling. 
		 });
	});	
	
};


exports.setComment = function(req, res) {
	var data = {};

	data.name = req.body.alias;
	data.message = req.body.message;

	var connectionPool = mysql.getConnectionPool();
	connectionPool.getConnection( function(err, connection) {
		var insertQuery = "INSERT INTO CHAT SET ?";

		connection.query( insertQuery, data, function(err, rows, fields) {
			if(err) {
				console.log("error: " + err); 
				res.send("ERROR");
			} 
			else {
				console.log("insert into CHAT is successfully done.");
				res.send("OK");

				connection.release();
			}
		 });
	});	
};
