var movie_id, max_id_counter;
var model = new sap.ui.model.json.JSONModel();

sap.ui.controller("movieratingmobile.detail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf movieratingmobile.detail
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf movieratingmobile.detail
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf movieratingmobile.detail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf movieratingmobile.detail
*/
//	onExit: function() {
//
//	}

	showHome: function() {
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "back");
	},
	
	initializeList: function(oEvent) {
		movie_id = new sap.ui.model.json.JSONModel(oEvent.data).getProperty("/oModel/oData" + oEvent.data.sPath + "/id");
		model.loadData("/movieRating/services/tweets.xsodata/AT_TWEETS/?$format=json&$filter=movie_id eq " + movie_id + "&$top=20&$orderby=id_counter desc", null, false);
		this.updateMax(model);
		this.getView().getContent()[0].getContent()[0].setDescription("Last updated time: " + new Date().toUTCString());
	},
	
	refreshList: function(oEvent) { 
		model.loadData("/movieRating/services/tweets.xsodata/AT_TWEETS/?$format=json&$filter=movie_id eq " + movie_id + "&$top=20&$orderby=id_counter desc", null, false);
		this.updateMax(model);
		this.getView().getContent()[0].getContent()[0].setDescription("Last updated time: " + new Date().toUTCString()).hide();
	},
	
	loadMore: function() {
		var mentionModel = new sap.ui.model.json.JSONModel();
		mentionModel.loadData("/movieRating/services/tweets.xsodata/AT_TWEETS/?$format=json&$filter=movie_id eq " + movie_id + " and id_counter lt '" + max_id_counter + "'&$top=20&$orderby=id_counter desc", null, false);
		var mentions = this.updateMax(mentionModel);
		for (var i in mentions) {
			this.getView().getContent()[0].getContent()[1].addItem(new sap.m.FeedListItem({
				iconDensityAware: false,
				sender: mentions[i].user_screen_name,
				icon: mentions[i].user_profile_image_url,
				info: mentions[i].sent,
				timestamp: mentions[i].created_at_str,
				text: mentions[i].text
			}));
		}
	},
	
	updateMax: function(model) {
		var mentions = model.getProperty("/d/results");
		max_id_counter = mentions[mentions.length - 1].id_counter;
		return mentions;
	}
});