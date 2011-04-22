Ext.define('App.view.UsersMan', {
	extend: 'Ext.window.Window',
	alias : 'widget.usersMan',

	initComponent: function() {
		Ext.apply(this, {
			width: 640, height: 380, modal: true, layout: 'border',
			title: 'Администрирование / пользователи',
			headerPosition: 'left',
			autoShow: true,
			items: [{
				xtype: 'tabpanel', region: 'center', border: false,
				bbar: { xtype: 'usersManBar' },
				margins: { right: 5 },
				items: [{
					title: 'Инфо', xtype: 'usersManInfo',
				},{
					title: 'Права', 
					//disabled: true,
					bodyStyle: 'background-color:#DFE8F6; padding: 5px 0 0 0;',
					items: { html: 'Rights' },
				}]
			},{
				xtype: 'usersManList', region: 'west', split: true
			}]
		}); this.callParent(arguments);
	}
});

Ext.define('App.view.UsersMan.Bar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.usersManBar',

	initComponent: function(){
		Ext.apply(this, {
			items: [{
				text: 'Удалить', action: 'delete'
			},'-',{
				text: 'Блокировка', action: 'enable'
			},'->',{
				text: 'Сохранить', action: 'save'
			}]
		}); this.callParent(arguments);
	}
});

Ext.define('App.view.UsersMan.UsersList', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.usersManList',

	initComponent: function(){
		Ext.apply(this, {
			width: 200,
			viewConfig: { forceFit: true },
			hideHeaders: true, border: false,
			//store: Ext.getStore('PplStore'),
			store: {
				fields: [ 'name', 'email' ],
				data: [{
					name: 'Ed', email: 'asdasd'
				},{
					name: 'asdasd', email: 'asdasdasd'
				}]
			},
			columns: [{ dataIndex: 'name', flex: 1 }],
		}); this.callParent(arguments);
	}
});

Ext.define('App.view.UsersMan.InfoView', {
	extend: 'Ext.form.FormPanel',
	alias: 'widget.usersManInfo',
	
	initComponent: function(){
		Ext.apply(this, {
			defaults: { xtype: 'textfield', anchor: '100%' },
			bodyStyle: 'background-color:#DFE8F6; padding: 5px 0 0 0;',
			items: [
				{ xtype: 'hiddenfield', name: 'id' },
				{ fieldLabel: 'Login', name: 'login' },
				{ fieldLabel: 'Фамилия', name: 'name_fam' },
				{ fieldLabel: 'Имя', name: 'name_im' },
				{ fieldLabel: 'Отчество', name: 'name_oth' },
				//{ fieldLabel: 'Права', xtype: 'trigger', name: 'rights' },
				{ xtype: 'fieldcontainer',
					fieldLabel: 'Пароль',
					msgTarget: 'side',
					layout: 'hbox', anchor: '100%',
					defaults: { xtype: 'textfield', hideLabel: true, flex: 1 },
					items: [
						{ name: 'pass1', inputType: 'password' },
						{ xtype: 'displayfield', value: '/', flex: 0, margins: { left: 5, right: 5 } },
						{ name: 'pass2', inputType: 'password' }
					]
				}
			],
		}); this.callParent(arguments);
	}

});
