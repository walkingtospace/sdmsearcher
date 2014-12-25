var utilHandler = {
	ajaxGet : function(query, callback) {
		$.ajax({
			type: "GET",
			url: query,
			async : false,
			contentType: 'application/json',
			success : function(data) {
				try {
					
					callback(data);			
				} catch(err) {
					console.log("utilHandler.get : error  " + query + " : "+ err);
				}
			},
			error : function(xhr,status,error) {
				console.log("utilHandler.get : error  " + query + " : "+ error);
			}
		});
	},

	ajaxPost : function(url, formId, callback) {
		$.ajax({
		      type: "POST",
		      url: url,
		      data: $("#" + formId).serialize(), // serializes the form's elements.
		      success: function(data) {
		      	try {
		      						
					callback(data);			
				} catch(err) {
					console.log("utilHandler.ajaxPost : error : "+ err);
				}   
			},
			error : function(xhr,status,error) {
				console.log("utilHandler.ajaxPost : error : "+ error);
			}
		});
	},

	urlParser : function (name){
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if (results==null){
				return null;
			}
		else{
			return results[1] || 0;
		}
	},

	getRootURL : function(url) {

		return url.substring(0, url.lastIndexOf("/"))  //  Return 'http://example.com' from 'http://example.com/test?id=1234'
 	}
};