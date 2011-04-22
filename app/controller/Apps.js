Ext.define('App.controller.Apps', {
	extend: 'Ext.app.Controller',

	stores: [ 'Orgs' ],
	models: [ 'Org' ],

	requires: [ 'App.view.Org' ],

	init: function() {
		this.control({
			'mainToolbar button[action=orgNew]': {
				click: this.newOrg
			},
		});
	},

	newOrg: function(btn){
		console.log('* Button :newOrg: was pressed', btn);
		var win = Ext.create('App.view.Org');
		win.show();
	}
});
