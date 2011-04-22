Ext.define('App.controller.Users', {
	extend: 'Ext.app.Controller',
	requires: [ 'App.view.UsersMan' ],

	//stores: [ 'Orgs' ],
	//models: [ 'Org' ],

	init: function() {
		this.control({
			'mainToolbar button[action=users]': { 
				click: this.showUpUsers
			},
			'usersMan usersManList dataview': {
				itemclick: this.userClick
			},
			'usersMan usersManBar button[action=save]': {
				click: function(){
					console.log('* btnSave click');
				}
			}
		});
	},
	
	userClick: function(grid, record) {
		console.log('* userClick', grid, record);
			/*
			listeners: {
				afterRender: function(grid){
					grid.getSelectionModel().on('selectionchange', function(sm, sel){
						if(sel.length){
							usersRightsForm.getForm().reset().setValues( sel[0].data );
						}else{
							usersRightsForm.getForm().reset();
						}
					});
				}
			}
			*/
		//var edit = Ext.create('AM.view.user.Edit').show();
		//edit.down('form').loadRecord(record);
	},

	showUpUsers: function(btn){
		console.log('* button =Users= pressed from Users controller', btn);
		var win = Ext.create('App.view.UsersMan');
	}
});
