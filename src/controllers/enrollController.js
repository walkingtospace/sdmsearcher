var rootDirectory = process.cwd();
var error = require(rootDirectory + '/controllers/errorController.js'); //usage: error.response(req, res, 404);
var email = require("nodemailer").mail;
var mysql = require(rootDirectory + '/mysql');

exports.setEnrollment = function(req, res) {
	var data = {};
	var emailAddress = "donnie@rewires.co"; //"walkingtospace@gmail.com";
	var sessionData = getSession(req, res);

	data.studioname = req.body.studioName;
	data.dressname = req.body.dressName;
	data.makeupname = req.body.makeupName;
	data.kakaoid = req.body.confirmCode;
	data.price = req.body.price;
	data.extrainfo = req.body.extraInfo;
	data.snapname = req.body.snapName;

	//store SDM data
	var connectionPool = mysql.getConnectionPool();
	connectionPool.getConnection( function(err, connection) {
		var insertQuery = "INSERT INTO SDMPACKAGE SET ?";

		connection.query( insertQuery, data, function(err, rows, fields) {
			if(err) {
				console.log("error: " + err); 
				res.send("ERROR");
			} 
			else {
				console.log("insert into SDMPACKAGE is successfully done.");
				sendEmail(emailAddress, data);

				res.send("OK");

				connection.release();
			}
		 });
	});	

	/*//store session data 
	if( sessionData !== null ) {
		connectionPool = mysql.getConnectionPool();
		connectionPool.getConnection( function(err, connection) {
			var insertQuery = "INSERT INTO CONFIRMCODE SET ?";  //need UPSERT

			connection.query( insertQuery, sessionData, function(err, rows, fields) {
				if(err) {console.log("error: " + err); } 
				else {
					console.log("insert into CONFIRMCODE is successfully done.");

					connection.release();
				}
			 });
		});	
	} else {
		res.send("ERROR");
	}*/
	
};

function getSession(req, res) {
	if( req.cookies['connect.sid'] !== undefined || req.cookies['connect.sid'] !== null ) {
		var frequency = Number(req.cookies.remember);
		var sessionid = req.cookies['connect.sid'];

		return {frequency: frequency, sessionid: sessionid};
	} else {

		return null;
	}

}

function sendEmail(emailAddress, data) {
	var text = "사용자가 등록한 견적: \n" 
	+ "스튜디오 : " + data.studioname + "\n"
	+ "드레스 : " + data.dressname + "\n"
	+ "메이크업 : " + data.makeupname + "\n"
	+ "스냅 : " + data.snapname + "\n"
	+ "특이사항 : " + data.extrainfo + "\n"
	+ "패키지 가격 : " + data.price + "\n"
	+ "카카오톡 ID : " + data.kakaoid;

	email({ 	//no callback ^^;
	    from: "sdm_searcher@rewires.co", // sender address
	    to: emailAddress, // list of receivers
	    subject: "[SDM searcher authentification email] USER KAKAO ID : " + data.kakaoid, 
	    text: text
	});
}
