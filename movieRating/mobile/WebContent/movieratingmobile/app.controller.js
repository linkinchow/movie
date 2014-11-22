sap.ui.controller("movieratingmobile.app", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf movieratingmobile.app
*/
	onInit: function() {
		
		var date_to = new Date();
		var date_from = new Date(date_to.getTime() - 6 * 24 * 60 * 60 * 1000);
		
		var oView = this.getView();
		var oModel = new sap.ui.model.json.JSONModel("/movieRating/services/movies.xsodata/InputParams(date_from=datetime'" + this.dateString(date_from) + "',date_to=datetime'" + this.dateString(date_to) + "')/Results/?$format=json&$orderby=mention desc");
		oView.setModel(oModel);
		
		var dateRange = sap.ui.getCore().byId("dateRange");
		dateRange.setDateValue(date_from);
		dateRange.setSecondDateValue(date_to);

		this.app = sap.ui.getCore().byId("app");
		
		var oBus = sap.ui.getCore().getEventBus();
		oBus.subscribe("nav", "to", this.navToHandler, this);
		oBus.subscribe("nav", "back", this.navBackHandler, this);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf movieratingmobile.app
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf movieratingmobile.app
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf movieratingmobile.app
*/
//	onExit: function() {
//
//	}
	
	dateString: function(date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		month = month > 9 ? month : "0" + month;
		var day = date.getDate();
		day = day > 9 ? day : "0" + day;
		return year + '-' + month + '-' + day;
	},
	
	navToHandler: function(channelId, eventId, data) {

		if (data && data.id) {
			// lazy load view
			if (this.app.getPage(data.id) === null) {
				jQuery.sap.log.info("now loading page '" + data.id + "'");
				this.app.addPage(sap.ui.jsview(data.id, "movieratingmobile." + data.id));
			}

			// Navigate to given page (include bindingContext)
			this.app.to(data.id, data.data.context);
		} else {
			jQuery.sap.log.error("nav-to event cannot be processed. Invalid data: " + data);
		}
	},
	
	navBackHandler: function() {
		this.app.back();
	}
});