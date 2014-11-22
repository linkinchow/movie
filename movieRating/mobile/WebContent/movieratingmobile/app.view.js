sap.ui.jsview("movieratingmobile.app", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf movieratingmobile.app
	*/ 
	getControllerName : function() {
		return "movieratingmobile.app";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf movieratingmobile.app
	*/ 
	createContent : function(oController) {

		var home = sap.ui.view({id:"homeView", viewName:"movieratingmobile.home", type:sap.ui.core.mvc.ViewType.JS});
		var detail = sap.ui.view({id:"detailView", viewName:"movieratingmobile.detail", type:sap.ui.core.mvc.ViewType.JS});
		return new sap.m.App("app").addPage(home).addPage(detail);
	}

});