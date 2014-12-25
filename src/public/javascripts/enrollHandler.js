var enrollHandler = {
	getSubmitResult : function(result) {
		if( result === "OK" ) {

			location.href = utilHandler.getRootURL(location.href) + "/confirmResult.html"; 	//Redirect to homepage
		} else {
			alert("제출 실패. 잠시 후 다시 시도해 주세요");
		}
	}
};