Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',
		layout: 'fit',

    requires: [ 'App.view.org.My', 'App.view.MainToolbar' ],
		
		initComponent: function() {
			var me = this;
			Ext.apply(me, {
				items: {
					xtype: 'panel',
					layout: { type: 'hbox', align: 'stretch' },

					dockedItems: { xtype: 'mainToolbar' },

					items: [{
						// Организации
						flex: 1, xtype: 'panel', layout: 'accordion',
						items: [{
							xtype: 'orgMy'
						},{
							html: 'here21', title: 'here21'
						}]
					},{
						// Ежедневник
						flex: 1, xtype: 'panel', layout: 'accordion',
						items: [{
							html: 'here21'
						},{
							html: 'here22'
						}]
					}]
				}
			});
			me.callParent(arguments);
		}
});
