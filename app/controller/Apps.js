Ext.define('App.controller.Apps', {
	extend: 'Ext.app.Controller',

	stores: [ 'Orgs' ],
	models: [ 'Org', 'PplContact' ],

	requires: [ 
		'App.view.Org',
		'App.view.ChooserTechTyre',
		'App.view.org.AddContact'
	],

	refs: [
		{ ref: 'orgWin', selector: 'orgWin' },
	],

	init: function() {
		this.control({
			'mainToolbar button[action=orgNew]': {
				click: this.newOrg
			},
			'mainToolbar button[action=orgAddContact]': {
				click: function(){
					Ext.create('App.view.org.AddContact').show();
				}
			},
		});
	},

	newOrg: function(btn){
		var win = Ext.create('App.view.Org');
		win.show();
	}
});
