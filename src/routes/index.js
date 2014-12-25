
/*
 * Route requests to controllers.
 */
 
var searchController = require(process.cwd() + '/controllers/searchController.js');
var enrollController = require(process.cwd() + '/controllers/enrollController.js');
var commentController = require(process.cwd() + '/controllers/commentController.js');
var confirmController = require(process.cwd() + '/controllers/confirmController.js');
var adminController = require(process.cwd() + '/controllers/adminController.js');

exports.configure = function(app) {
	//index.html : 스드메 검색
	app.get('/', searchController.index);
	app.get('/list', searchController.getList);
	app.get('/search', searchController.getSearchResult);
	
	//enrollment.html : 내견적 등록하기
	app.post('/enrollment', enrollController.setEnrollment);

	//intro.html : 사용자 댓글 가져오기 및 등록
	app.get('/message', commentController.getComment); 
	app.post('/message', commentController.setComment);

	//confirm.html : 내 인증코드 확인
	app.get('/authentification', confirmController.getData);
	app.post('/authentification', confirmController.authentification);

	//admin.html : 레몬테라스 url, 페이스북 url, 인증코드 등록
	app.get('/admin', adminController.getData);
	app.post('/admin', adminController.setData);
};
