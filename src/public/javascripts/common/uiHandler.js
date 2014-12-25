/*
* manage 'all' pages' UI components here
*/

var uiHandler = { 
	selectedStudioId : null,
	selectedDressId : null,
	selectedMakeupId : null,

	init : function() { 
		//index.html
		if( document.getElementById("searchBtn") !== undefined && document.getElementById("searchBtn") !== null) {
			$(document).on('click', '#searchBtn', function(){ 
				if( uiHandler.selectedStudioId !== null && uiHandler.selectedDressId !== null && uiHandler.selectedMakeupId !== null ) {
					searchHandler.moveToResultPage(uiHandler.selectedStudioId, uiHandler.selectedDressId, uiHandler.selectedMakeupId);
				} else {
					alert("스튜디오/드레스/메이크업 샵 중 각각 1개씩 반드시 선택해야 합니다.");
				}
			});
		}

		//searchResult.html
		if( document.getElementById("searchAgainBtn") !== undefined && document.getElementById("searchAgainBtn") !== null ) {
			$(document).on('click', '#searchAgainBtn', function(){ 
				searchHandler.moveToHomePage();
			});
		}

		//enrollment.html
		if( document.getElementById("submitBtn") !== undefined && document.getElementById("submitBtn") !== null ) {
			$(document).on('click', '#submitBtn', function(){
				var $form = $("#submitForm").children();
				var validateCheck = uiHandler.checkParameters( $form );

				if( validateCheck === true ) {
					var url = utilHandler.getRootURL(location.href) + "/enrollment";

					//add hidden input for 'textarea'
					var extraInfoValue = document.getElementById("extraInfo").value;
					var extraInfo = $('<input type="hidden" value='+extraInfoValue+' name="extraInfo">'); 
					$('#submitForm').append($(extraInfo));

					utilHandler.ajaxPost(url , 'submitForm', enrollHandler.getSubmitResult );
				}
			});
		}

		//confirmResult.html
		if( document.getElementById("homeBtn") !== undefined && document.getElementById("homeBtn") !== null ) {
			$(document).on('click', '#homeBtn', function(){ 
				confirmHandler.moveToHomePage();
			});
		}

		//confirm.html
		if( document.getElementById("submitCodeBtn") !== undefined && document.getElementById("submitCodeBtn") !== null ) {
			$(document).on('click', '#submitCodeBtn', function(){
				var url = utilHandler.getRootURL(location.href) + "/authentification";

				utilHandler.ajaxPost(url , 'submitForm', confirmHandler.getSubmitResult );
			});
		}

		//admin.html
		if( document.getElementById("adminSubmitBtn") !== undefined && document.getElementById("adminSubmitBtn") !== null ) {
			$(document).on('click', '#adminSubmitBtn', function(){
				var url = utilHandler.getRootURL(location.href) + "/admin";

				utilHandler.ajaxPost(url , 'submitForm', adminHandler.getSubmitResult );
			});
		}

		//footer
		if( document.getElementById("moveToIntro") !== undefined && document.getElementById("moveToIntro") !== null ) {
			$(document).on('click', '#moveToIntro', function(){

				location.href = utilHandler.getRootURL(location.href) + "/intro.html";
			});
		}
		//footer
		if( document.getElementById("moveToEnrollment") !== undefined && document.getElementById("moveToEnrollment") !== null ) {
			$(document).on('click', '#moveToEnrollment', function(){

				location.href = utilHandler.getRootURL(location.href) + "/enrollment.html";
			});
		}

		//header
		if( document.getElementById("header") !== undefined && document.getElementById("header") !== null ) {
			$(document).on('click', '#header', function(){

				location.href = utilHandler.getRootURL(location.href); //go to home
			});
		}

		//confirm.html
		if( document.getElementById("enrollBtn") !== undefined && document.getElementById("enrollBtn") !== null ) {
			$(document).on('click', '#enrollBtn', function(){

				location.href = utilHandler.getRootURL(location.href) + "/enrollment.html"; //go to home
			});
		}

		//intro.html
		if( document.getElementById("commentSubmitBtn") !== undefined && document.getElementById("commentSubmitBtn") !== null ) {
			$(document).on('click', '#commentSubmitBtn', function(){
				var url = utilHandler.getRootURL(location.href) + "/message";

				utilHandler.ajaxPost(url , 'submitForm', commentHandler.getSubmitResult );
			});
		}

		
	},

	setIndexpage : function(studio, dress, makeup) {
		var totalNum = document.getElementById("totalNum"); //total 
		var RATIOCONSTANT = 10; //너무 수가 많아서 기획자의 요청으로 전체 견적 수의 10분의 1만 보이도록. 
		var companyList = document.getElementById("companyList");

		var studioList = document.createElement("li");
		var studioList_company = document.createElement("span");
		var studioList_count = document.createElement("span");

		var dressList = document.createElement("li");
		var dressList_company = document.createElement("span");
		var dressList_count = document.createElement("span");

		var makeupList = document.createElement("li");
		var makeupList_company = document.createElement("span");
		var makeupList_count = document.createElement("span");
		
		totalNum.innerHTML = parseInt( (studio.length * dress.length * makeup.length)/RATIOCONSTANT );

		/* studio list header */
		studioList.id = "studioList";
		studioList.setAttribute("data-role", "list-divider");
		studioList.innerHTML = "스튜디오";

		studioList_company.id= "studioList-company";

		studioList_count.id = "studioList-count";
		studioList_count.className = "ui-li-count";
		
		studioList_count.innerHTML = studio.length + "개 업체";

		studioList.appendChild(studioList_company);
		studioList.appendChild(studioList_count);

		companyList.appendChild(studioList);

		uiHandler.createRadioButtons(studio, "studiogroup", companyList);

		/* dress list header */
		dressList.id = "dressList";
		dressList.setAttribute("data-role", "list-divider");
		dressList.innerHTML = "드레스";

		dressList_company.id= "dressList-company";

		dressList_count.id = "dressList-count";
		dressList_count.className = "ui-li-count";
		
		dressList_count.innerHTML = dress.length + "개 업체";

		dressList.appendChild(dressList_company);
		dressList.appendChild(dressList_count);

		companyList.appendChild(dressList);

		uiHandler.createRadioButtons(dress, "dressgroup", companyList);

		/* makeup list header */
		makeupList.id = "makeupList";
		makeupList.setAttribute("data-role", "list-divider");
		makeupList.innerHTML = "메이크업";

		makeupList_company.id= "makeupList-company";

		makeupList_count.id = "makeupList-count";
		makeupList_count.className = "ui-li-count";
		
		makeupList_count.innerHTML = makeup.length + "개 업체";

		makeupList.appendChild(makeupList_company);
		makeupList.appendChild(makeupList_count);
		
		companyList.appendChild(makeupList);

		uiHandler.createRadioButtons(makeup, "makeupgroup", companyList);

		$('.ui-page').trigger('create'); // then tell JQM to recreate page because we added new content
		$("#companyList").listview("refresh");

		$(document).on('change', '[type="radio"]', function(){ 
			var name = this.name;
			var id = this.id;
		
			if( name === "studiogroup" ) {
				//document.getElementById("studioList-company").innerHTML = this.value;
				document.getElementById("selectedStudio").innerHTML = this.value + ", ";
				uiHandler.selectedStudioId = id.substring(id.lastIndexOf("_")+1);
			} else if( name === "dressgroup" ) {
				//document.getElementById("dressList-company").innerHTML = this.value;
				document.getElementById("selectedDress").innerHTML = this.value + ", ";
				uiHandler.selectedDressId = id.substring(id.lastIndexOf("_")+1);
			} else if( name === "makeupgroup" ) {
				//document.getElementById("makeupList-company").innerHTML = this.value;
				document.getElementById("selectedMakeup").innerHTML = this.value + ", ";
				uiHandler.selectedMakeupId = id.substring(id.lastIndexOf("_")+1);
			}
		});  
	},

	createRadioButtons : function(data, name, container) {

		for( var i=0; i<data.length ; i++) {
			var li  = document.createElement("li");

			var element = data[i];
			var input = document.createElement("input");
			var label =  document.createElement("label");

			if( name === "studiogroup" ) {
				input.id = "studio_" + element.studioid;
				input.type = "radio";
				input.name = name;
				input.value = element.studioname;
				label.htmlFor = input.id;
				label.innerHTML = element.studioname;
			} else if( name === "dressgroup" ) {
				input.id = "dress_" + element.dressid;
				input.type = "radio";
				input.name = name;
				input.value = element.dressname;
				label.htmlFor = input.id;
				label.innerHTML = element.dressname;
			} else if( name === "makeupgroup" ) {
				input.id = "makeup_" + element.makeupid;
				input.type = "radio";
				input.name = name;
				input.value = element.makeupname;
				label.htmlFor = input.id;
				label.innerHTML = element.makeupname;
			}

			li.appendChild(label);
			li.appendChild(input);

			container.appendChild(li);
		}
	},

	setSearchResultPage : function(studio, dress, makeup) {
		var resultListItemAside = document.getElementById("resultListItemAside");
		var resultListItem = document.getElementById("resultListItem");
		
		var studioName = document.getElementById("studioName");
		var dressName = document.getElementById("dressName");
		var makeupName = document.getElementById("makeupName");
		var money = document.getElementById("money");
		var info = document.getElementById("info");

		studioName.innerHTML = studio[0].studioname;
		dressName.innerHTML = dress[0].dressname;
		makeupName.innerHTML = makeup[0].makeupname;
	
		money.innerHTML = studio[0].studiomoney + dress[0].dressmoney + makeup[0].makeupmoney;

		if( studio[0].studioinfo.length <= 0 ) {
			studio[0].studioinfo = "추가 정보 없음";
		}

		if( dress[0].dressinfo.length <= 0 ) {
			dress[0].dressinfo = "추가 정보 없음";
		}

		if( makeup[0].makeupinfo.length <= 0 ) {
			makeup[0].makeupinfo = "추가 정보 없음";
		}
		
		info.innerHTML = "[스] " + studio[0].studioinfo + "<br>" + "[드] " +  dress[0].dressinfo + "<br>" + "[메] " +  makeup[0].makeupinfo;
	/*	resultListItemAside.innerHTML = studio[0].studiomoney + "만원";
		resultListItem.innerHTML  =  studio[0].studioname + "  "
		+ dress[0].dressname + "  "
		+ makeup[0].makeupname + "  ";
		resultListItem.appendChild(resultListItemAside);*/
	},

	checkParameters : function($form) {
		var children = $form.children();
		var isValidated = true;
		for( var i=0 ; i< children.length ; i++ ) {
			if( (children[i].tagName === "INPUT" && children[i].getAttribute("type") === "text" ) || ( children[i].tagName === "TEXTAREA") ) { 
				if( children[i].id === "snapName" ) {		//SNAP is optional field
 
					continue;
				} else if( children[i].value === undefined || children[i].value === null || children[i].value.length <= 0) {
					alert("스냅/원판을 제외한 모든 칸을 입력해 주세요");
					isValidated = false;

					break;
				}
			}
		}

		return isValidated;
	},

	setAdminPage : function(data) {
		var facebookURL = document.getElementById("facebookURL");
		var siteURL = document.getElementById("siteURL");

		if( data[0].siteurl !== undefined && data[0].siteurl !== null ) {
			siteURL.value = data[0].siteurl;
		}

		if( data[0].facebookurl !== undefined && data[0].facebookurl !== null ) {
			facebookURL.value = data[0].facebookurl;
		}
	},

	setConfirmPage : function(data) {
		var facebookURL = document.getElementById("facebookURL");
		var siteURL = document.getElementById("siteURL");

		if( data[0].siteurl !== undefined && data[0].siteurl !== null ) {
			siteURL.href = data[0].siteurl;
			siteURL.innerHTML = "<br><br>" + data[0].siteurl;
		}

		if( data[0].facebookurl !== undefined && data[0].facebookurl !== null ) {
			facebookURL.href = data[0].facebookurl;
		}
	},

	setIntroPage : function(data) {
		var postingList = document.getElementById("postingList");
	
		for( var i=0; i<data.length ; i++ ) {
			var li = document.createElement("li");
			var userName = document.createElement("span");
			var userMessage = document.createElement("span");
			var userTime = document.createElement("span");

			li.className = "ui-corner-none ui-li ui-li-static ui-body-d ui-corner-top ui-corner-bottom";
			userName.className = "userName";
			userMessage.className = "userMessage";
			userTime.className = "userTime";

			userName.innerHTML = data[i].name + "</br></br>";
			userMessage.innerHTML = data[i].message + "</br></br>";
			userTime.innerHTML = data[i].date.substring(0, data[i].date.lastIndexOf(":") );

			li.appendChild(userName);
			li.appendChild(userMessage);
			li.appendChild(userTime);

			postingList.appendChild(li);
		}
	}
};
