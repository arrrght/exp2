Ext.define('App.controller.Org', {
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
			'orgWin button[action=changeTab]': {
				click: this.changeTab
			},
		});
	},

	emptyFun: function(){
		console.log('* emptyFun');
	},

	orgAddContact: function(){
		Ext.create('App.view.org.AddContact').show();
	},

	orgEditBaseTechTyre: function(){
		Ext.create('App.view.ChooserTechTyre').show();
	},

	changeTab: function(){
		var funs = {
			info: this.emptyFun,
			contacts: this.emptyFun,
			contracts: this.orgAddContact,
			sales: this.emptyFun,
			techBase: this.orgEditBaseTechTyre,
			reports: this.emptyFun,
			nonExists: this.emptyFun
		};
		funs[this.getOrgWin().down('tabpanel').activeTab.tabName || 'nonExist'].apply(this);
	},

});
