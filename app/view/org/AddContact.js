Ext.define('App.view.org.AddContact',{
	extend: 'Ext.window.Window',
	alias: 'orgAddContact',

	initComponent: function(){ Ext.apply(this, {
		modal: true, maximizable: true, 
		height: 400, width: 600, border: false,
		layout: { type: 'fit' },
		items: [{
			defaults: { flex:1, xtype: 'textfield', labelAlign: 'top' },
			xtype: 'container', items: [{
				flex: 3, fieldLabel: 'Название',// margins: { right: 5 },
			}]
		}]
	}); this.callParent(arguments) }
});
