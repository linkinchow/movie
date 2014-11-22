sap.ui.controller("movieratingmobile.home", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf movieratingmobile.home
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf movieratingmobile.home
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf movieratingmobile.home
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf movieratingmobile.home
*/
//	onExit: function() {
//
//	}
	
	changeDate: function(oEvent) {
		this.getView().getModel().loadData("/movieRating/services/movies.xsodata/InputParams(date_from=datetime'" + sap.ui.controller("movieratingmobile.app").dateString(oEvent.getParameters().from) + "',date_to=datetime'" + sap.ui.controller("movieratingmobile.app").dateString(oEvent.getParameters().to) + "')/Results/?$format=json&$orderby=mention desc");
	},
	
	showDetail: function(oEvent) {
		var oBindingContext = oEvent.getSource().getParent().getBindingContext();

		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "to", {
			id: "detail",
			data: {
				context : oBindingContext
			}
		});
	}
});