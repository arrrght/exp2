Ext.define('App.view.ChooserTechTyre', {
	extend: 'Ext.window.Window',
	alias: 'chooserTechTyre',

	requires: [
		'App.view.chooserTechTyre.Tyre',
		'App.view.chooserTechTyre.Tech',
		'App.view.chooserTechTyre.ExistsTech',
		'App.view.chooserTechTyre.ExistsTyre'
	],

	initComponent: function(){ Ext.apply(this, {
		modal: true, maximizable: true, 
		height: 530, width: 900, border: false,
		buttons: [
			{ text: 'Сохранить и закрыть' }
		],
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			flex: 2, xtype: 'container',
			layout: { type: 'hbox', align: 'stretch' },
			items: [{
				flex:2, xtype: 'existsTech'
			},{
				flex:3, xtype: 'existsTyre'
			}]
		},{
			flex: 5, xtype: 'container',
			layout: { type: 'hbox', align: 'stretch' },
			items: [{
				flex:2, xtype: 'chooserTech'
			},{
				flex:3, xtype: 'chooserTyre'
			}]
		}]

	}); this.callParent(arguments) },
});


