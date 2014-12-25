var commentHandler = {
	getList : function(url) {
		var query = url + 'message';

		utilHandler.ajaxGet(query, uiHandler.setIntroPage);
	},

	getSubmitResult : function(result) {
		if( result === "OK" ) {
			alert("댓글이 등록되었습니다.");

			location.href = utilHandler.getRootURL(location.href) + "/intro.html"; 	//refresh
		} else {
			alert("서버 Error");
		}
	}
};