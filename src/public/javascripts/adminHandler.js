var adminHandler = {
	getInfo : function(url) {
		var requestUrl = url + "admin";
		utilHandler.ajaxGet(requestUrl, uiHandler.setAdminPage);
	},

	getSubmitResult : function(result) {
		if( result === "OK" ) {
			alert("등록 성공");
			
			location.href = utilHandler.getRootURL(location.href) + "/admin.html"; 
		} else {
			alert("서버 Error");
		}
	}

};