var searchHandler = {

	init : function() {
		var query = location.href + 'list';
		utilHandler.ajaxGet(query, searchHandler.showList); //register callback
	},

	showList : function(data) {
		var studio = data[0] || null;
		var dress = data[1] || null;
		var makeup = data[2] || null;

		uiHandler.setIndexpage(studio, dress, makeup);
	},

	moveToResultPage : function(studioid, dressid, makeupid) {
		location.href = "searchResult.html?studioid=" + studioid 
		+ "&dressid=" + dressid 
		+ "&makeupid=" + makeupid;
		
		/*$.mobile.changePage('searchResult.html', { //Do not use. JQM has a bug that it can't load <header> when do changePage() 
			data: {
				studioid : studioid,
				dressid : dressid,
				makeupid : makeupid
		      }
		});*/
	},

	moveToHomePage : function() {
		location.href = utilHandler.getRootURL(location.href);
	},

	searchResultInit : function(parameters) {
		//parse
		var studioid = utilHandler.urlParser('studioid');
		var dressid = utilHandler.urlParser('dressid');
		var makeupid = utilHandler.urlParser('makeupid');

		searchHandler.search(studioid, dressid, makeupid);
	},

	search : function(studioid, dressid, makeupid) {
		var query = utilHandler.getRootURL(location.href) + "/"
		+ 'search?studioid=' + studioid
		+ '&dressid=' + dressid
		+ '&makeupid=' + makeupid;

		utilHandler.ajaxGet(query, searchHandler.showSearchResult);
	},

	showSearchResult : function(data) {
		if( data === "NO AUTHENTIFICATION" ) {
			//need loading bar
			location.href = utilHandler.getRootURL(location.href) + "/confirm.html"; 
		} else {
			var studio = data[0] || null;
			var dress = data[1] || null;
			var makeup = data[2] || null;

			studio[0].studiomoney += searchHandler.makeRandomPrice();
			dress[0].dressmoney += searchHandler.makeRandomPrice();
			makeup[0].makeupmoney += searchHandler.makeRandomPrice();

			uiHandler.setSearchResultPage(studio, dress, makeup);
		}
	},

	makeRandomPrice : function() {
		var randomValue = Math.floor(Math.random() * 10);

		if(  randomValue > 5 ) {
			return 5;
		} else {
			return 3;
		}
	}
};
