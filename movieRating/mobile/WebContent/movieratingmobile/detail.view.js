sap.ui.jsview("movieratingmobile.detail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf movieratingmobile.detail
	*/ 
	getControllerName : function() {
		return "movieratingmobile.detail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf movieratingmobile.detail
	*/ 
	createContent : function(oController) {
		
		var pullToRefresh = new sap.m.PullToRefresh({ 
			refresh: [oController.refreshList, oController]
		});
		
		var poster = new sap.m.Image({
			densityAware: false,
			src: "{poster}"
		});
		
		var title = new sap.m.Text({
			text: "{title}"
		}).addStyleClass("title");
		
		var release_date = new sap.m.Text({
			text: "{release_date}"
		});
		
		var rating = new sap.m.RatingIndicator({
			iconSize: "12px",
			value: { 
				path: "rating", 
				formatter: function(fValue) { 
					return parseFloat(fValue) / 2;
				}
			}
		});
		
		var score = new sap.m.Text({
			text: { 
				path: "rating", 
				formatter: function(fValue) { 
					return " " + fValue;
				}
			}
		});
		
		var rating_score = new sap.m.HBox({
			items: [rating, score]
		});
		
		var mention = new sap.m.Text({
			text: { 
				path: "mention", 
				formatter: function(fValue) { 
					return "(" + fValue + " Mentions)";
				}
			}
		});
		
		var vbox = new sap.m.VBox({
	        items: [title, release_date, rating_score, mention]
		}).addStyleClass("info");
		
		var hbox = new sap.m.HBox({
			items: [poster, vbox]
		}).addStyleClass("movieInfo");
		
		var oBar = new sap.m.Toolbar({
			height: "90px",
			content: [hbox]
		});
		
		var listItem = new sap.m.FeedListItem({
			iconDensityAware: false,
			sender: "{user_screen_name}",
			icon: "{user_profile_image_url}",
			info: "{sent}",
			timestamp: "{created_at_str}",
			text: "{text}"
		});
		
		var oList = new sap.m.List({
			items: {
				path: "/d/results", 
				template: listItem
			}
		});
		oList.setModel(model);
		
		var loader = new sap.m.StandardListItem({
			type: sap.m.ListType.Active,
			title: "Load 20 more mentions...",
			press: [oController.loadMore, oController]
		});
		
		var page = new sap.m.Page({
			title: "Movie Detail",
			showNavButton: true,
			subHeader: oBar,
			content: [pullToRefresh, oList, loader],
			navButtonPress: [oController.showHome, oController]
		});
		
		this.addEventDelegate({ 
 			onBeforeShow: function(evt) { 
 				this.setBindingContext(evt.data);
 				oController.initializeList(evt);
 			}
 		}, this);
 		
 		return page;
	}

});