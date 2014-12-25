var confirmHandler = {

	getInfo : function(url) {
		var requestUrl = url + "authentification";
		utilHandler.ajaxGet(requestUrl, uiHandler.setConfirmPage);
	},
	moveToHomePage : function() {

		location.href = utilHandler.getRootURL(location.href);
	},

	getSubmitResult : function(result) {
		if( result === "OK" ) {
			alert("인증 성공");
			
			location.href = utilHandler.getRootURL(location.href); 	//Redirect to homepage
		} else {
			alert("인증 실패. 인증코드가 잘못 되었습니다.");
		}
	}
};