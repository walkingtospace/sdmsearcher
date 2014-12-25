
var rootDirectory = process.cwd(); 
var error = require(rootDirectory + '/controllers/errorController.js'); //usage: error.response(req, res, 404);
var mysql = require(rootDirectory + '/mysql');

exports.index = function (req, res) {

	res.render(rootDirectory + '/public/index.html');
};

exports.getList = function(req, res) {
	var data = new Array();
	var connectionPool = mysql.getConnectionPool();

	connectionPool.getConnection( function(err, connection) {
		
		var studioQuery = 'SELECT studioname, studioid from STUDIO ORDER BY studioname ASC'; //
		var dressQuery = 'SELECT dressname, dressid from DRESS ORDER BY dressname ASC';
		var makeupQuery = 'SELECT makeupname, makeupid from MAKEUP ORDER BY makeupname ASC';

		connection.query( studioQuery, function(err, rows, fields) {
			if(err) {console.log("error: " + err); } 
			else {
				data.push(rows);
				connection.query( dressQuery, function(err, rows, fields) {

					if(err) {console.log("error: " + err); } 
					else {

						data.push(rows);
						connection.query( makeupQuery, function(err, rows, fields) {
							if(err) {console.log("error: " + err); } 
							else {

								data.push(rows);
								res.send(data);
							}

							connection.release(); //after using, it shoule be released for recycling. 
						 });
					}
				 });
			}
		 });
	});	
};

exports.getSearchResult = function(req, res) {
	var data = new Array();
	var connectionPool = mysql.getConnectionPool();
	var studioid = req.query.studioid != "null" ? req.query.studioid : (req.query.studioid + ' OR 1');  //선택하지 않으면 모두 출력
	var dressid =  req.query.dressid != "null" ? req.query.dressid : (req.query.dressid + ' OR 1');  //!! 추후 수정 필요. 클라이언트에서 넘어온 null이 어떻게 인식되는지 체크 해야함
	var makeupid =  req.query.makeupid != "null" ? req.query.makeupid : (req.query.makeupid + ' OR 1');
	var studioname = req.query.studioname || null;
	var dressname = req.query.dressname || null;
	var makeupname = req.querymakeuponame || null;

	var isConfirmed = checkSession(req, res);

	if( isConfirmed === true ) {
		connectionPool.getConnection( function(err, connection) {
			//rewires가 등록한 data에서 search
			var studioQuery = 'SELECT studioname, studioid, studioinfo, studiomoney from STUDIO where studioid=' + studioid; 
			var dressQuery = 'SELECT dressname, dressid, dressinfo, dressmoney from DRESS where dressid='  + dressid;
			var makeupQuery = 'SELECT makeupname, makeupid, makeupinfo, makeupmoney from MAKEUP where makeupid=' + makeupid;

			//user가 등록한 data에서 search
			var textSearchQuery = "SELECT * from SDMPACKAGE where MATCH(studioname) AGAINST ('" +studioname 
				+ "') AND MATCH(dressname) AGAINST ('"+ dressname
				+"') AND MATCH(makeupname) AGAINST ('"+ makeupname
				+"')";
			
			connection.query( studioQuery, function(err, rows, fields) {
				if(err) {console.log("error: " + err); } 
				else {
					data.push(rows);

					connection.query( dressQuery, function(err, rows, fields) {
						if(err) {console.log("error: " + err); } 
						else {
							data.push(rows);

							connection.query( makeupQuery, function(err, rows, fields) {
								if(err) {console.log("error: " + err); } 
								else {
									data.push(rows);
									//need to save frequency
									res.send(data);
								}

								connection.release(); //after using, it shoule be released for recycling. 
							});
						}
					});
				}
			 });
		});	
	} else {

		res.send("NO AUTHENTIFICATION"); //Redirect client to confirm.html
	}
};

function checkSession(req, res) {
	//session manage
	if( req.cookies.code !== undefined && req.cookies.code !== null) { 	//check if authentification code exists
		//need DB matching 
		var count = Number(req.cookies.remember);
		count++;
		res.cookie('remember', count);

		storeUserInfo(req.cookies.code);

		return true;
	} else if( req.cookies.remember && Number(req.cookies.remember) < 3  ) {
		var count = Number(req.cookies.remember);
		count++;
		res.cookie('remember', count);

		return true;
	} else if( req.cookies.remember && Number(req.cookies.remember) >= 3 ) {
		console.log("This user used SDM searcher over 3 times.");

		return false;
	} else {
		console.log("Created new Cookie.");
		res.cookie('remember', 1, { expires: new Date(Date.now() + (1000*60*60*24*7) ) }); //7 days = 1000 * 60 * 60 * 24 * 7

		return true;
	}
}

function storeUserInfo(code) {
	var password = code;
	var connectionPool = mysql.getConnectionPool();

	connectionPool.getConnection( function(err, connection) {
		var updateQuery = "UPDATE CONFIRMCODE SET frequency= frequency+1 where password= '" + password + "'"; 

		connection.query( updateQuery, function(err, rows, fields) {
			if(err) {console.log("error: " + err); } 
			else {
				console.log("store userlog success");
			}
		 });
	});	

}

