sap.ui.jsview("movieratingmobile.home", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf movieratingmobile.home
	*/ 
	getControllerName : function() {
		return "movieratingmobile.home";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf movieratingmobile.home
	*/ 
	createContent : function(oController) {
		
		var poster = new sap.m.Image({
			densityAware: false,
			src: { 
				path: "poster", 
				formatter: function(fValue) { 
					return fValue.replace(/tmb/, "det");
				}
			},
			press: [oController.showDetail, oController]
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
		}).addStyleClass("score");
		
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
			alignItems: sap.m.FlexAlignItems.Center,
	        items: [poster, title, release_date, rating_score, mention]
		});
		
		var carousel = new sap.m.Carousel({
			loop: true,
			showPageIndicator: false,
			pages: {
				path: "/d/results", 
				template: vbox
			}
		});
		
		var dateRange = new sap.m.DateRangeSelection("dateRange", {
			change: [oController.changeDate, oController]
		});
		
		var page = new sap.m.Page({
			title: "Movie Sentiment Rating",
			content: [dateRange, carousel]
		});
		
		return page;
	}
});