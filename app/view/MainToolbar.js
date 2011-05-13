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
					{ text: 'Фильтр[newContacts]', action: 'orgAddContact' }
				]
			},{
				xtype: 'buttongroup', title: 'Ежедневник', columns: 3,
				items: [
					{ text: 'Новая задача' },
					{ text: 'Фильтр' }
				]
			},{
				xtype: 'buttongroup', title: 'Администрирование', columns: 3,
				items: [
					{ text: 'Справочники', menu: [
						{ text: 'Техника' },
						{ text: 'Шины' },
						{ text: 'Умный поиск' },
					]},
					{ text: 'Пользователи', action: 'users' },
					{ text: 'Лог' }
				]
			}]
		});

		me.callParent(arguments);
	}

});
