Ext.define('App.view.MainToolbar',{
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.mainToolbar',

	initComponent: function(){
		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'buttongroup', title: 'Организации', columns: 3,
				items: [
					// New
					{ text: 'Новая', action: 'orgNew' },
					// Filter
					{ text: 'Фильтр' }
				]
			},{
				xtype: 'buttongroup', title: 'Ежедневник', columns: 3,
				items: [
					// New
					{ text: 'Новая задача' },
					// Filter
					{ text: 'Фильтр' }
				]
			},{
				xtype: 'buttongroup', title: 'Администрирование', columns: 3,
				items: [
					// Users
					{ text: 'Пользователи', action: 'users' },
					// Log
					{ text: 'Лог' }
				]
			}]
		});

		me.callParent(arguments);
	}

});
