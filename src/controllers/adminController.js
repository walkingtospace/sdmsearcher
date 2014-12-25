var rootDirectory = process.cwd(); 
var error = require(rootDirectory + '/controllers/errorController.js'); //usage: error.response(req, res, 404);
var mysql = require(rootDirectory + '/mysql');

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


exports.setData = function(req, res) {
	var data = {};
	var confirmcode = {password : req.body.confirmCode};

	data.siteurl = req.body.siteURL || null;
	data.facebookurl = req.body.facebookURL || null;

	var connectionPool = mysql.getConnectionPool();
	connectionPool.getConnection( function(err, connection) { //insert or update : id 7 레코드를 계속 replace  수정 필요.
		var upsertQuery = "REPLACE INTO SITEINFO ( id, facebookurl, siteurl ) VALUES ( " +
			"'7'" + ", '" + data.siteurl + "' , '" + data.facebookurl  + "' )";
		var updateQuery = "INSERT INTO CONFIRMCODE SET ? ";

		connection.query( upsertQuery, function(err, rows, fields) {
			if(err) {
				console.log("error: " + err); 

				connection.release();

				res.send("ERROR");
			} 
			else {
				connection.query( updateQuery, confirmcode , function(err, rows, fields) {
					if(err) {
						console.log("error: " + err); 

						res.send("ERROR");
					} 
					else {
						connection.release();

						res.send("OK");
					}
				 });
			}
		 });
		
	});	

};
