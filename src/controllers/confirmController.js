var rootDirectory = process.cwd(); 
var error = require(rootDirectory + '/controllers/errorController.js'); //usage: error.response(req, res, 404);
var mysql = require(rootDirectory + '/mysql');

exports.authentification = function(req, res) {
	var confirmCode = req.body.confirmCode;
	var sessionid = confirmCode;
	var connectionPool = mysql.getConnectionPool();

	connectionPool.getConnection( function(err, connection) {
		var findQuery = 'SELECT id from CONFIRMCODE where password= "' + confirmCode + '"'; //

		connection.query( findQuery, function(err, rows, fields) {
			if(err) {console.log("error: " + err); } 
			else {
				if( rows.length === 0) {
					connection.release();

					res.send("ERROR");
				} else {
					var id = rows[0].id;
					var updateQuery = "UPDATE CONFIRMCODE SET sessionid= ' " + sessionid + " ' where id= " + id; 

					connection.query( updateQuery, function(err, rows, fields) {
						if(err) {console.log("error: " + err); } 
						else {
							connection.release();

							res.cookie('code', confirmCode);

							res.send("OK");
						}
					 });
				}
			}
		 });
	});	
};

exports.getData = function(req, res) {
	var connectionPool = mysql.getConnectionPool();

	connectionPool.getConnection( function(err, connection) {
		
		var infoQuery = 'SELECT siteurl, facebookurl from SITEINFO'; //

		connection.query( infoQuery, function(err, rows, fields) {
			if(err) {console.log("error: " + err); } 
			else {
				res.send(rows);				

				connection.release();
			}
		 });
	});	
};


