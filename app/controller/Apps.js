Ext.define('App.controller.Apps', {
	extend: 'Ext.app.Controller',

	stores: [ 'Orgs' ],
	models: [ 'Org', 'Ppl' ],

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
					Ext.create('App.view.Cp').show();
				}
			},
			'orgMy': {
				itemdblclick: function(view, record){
					var win = Ext.create('App.view.Org');
					//win.setOrgId(record.data._id);
					Orgs.getOrgInfo(
						{ id: record.data._id },{
							success: function(data){
								W = win; //DEBUG
								console.log(win, data);
								fromRecToForm(
									data,
									win.down('orgBaseInfo'),
									'name area city province zip street house liter office rem' // addr
								);
								win.down('orgContacts').getStore().loadData(data.ppls);
							},
							failure: function(){
								//
							}
						}
					);


					win.down('orgBaseInfo textfield[name="name"]').setValue(record.data.name);
					win.show();
				}
			}
		});
	},

	newOrg: function(btn){
		var win = Ext.create('App.view.Org');
		win.show();
	}
});
