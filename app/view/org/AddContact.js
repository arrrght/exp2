Ext.define('App.view.org.AddContact',{
	extend: 'Ext.window.Window',
	alias: 'widget.orgAddContact',

	initComponent: function(){ Ext.apply(this, {
		modal: true, maximizable: true, title: 'Человек',
		height: 450, width: 600, //border: false,
		layout: { type: 'vbox', align: 'stretch' },
		defaults: { height: 44, xtype: 'container', layout: 'hbox', border: false },
		bbar: ['->', {
			xtype: 'button', itemId: 'save', text: 'Сохранить изменения'
		},'-',{
			xtype: 'button', itemId: 'cancel', text: 'Отмена'
		}],
		items: [{
			margins: { top: 5 },
			defaults: { flex:1, xtype: 'textfield', labelAlign: 'top', margins: { right: 5 } },
			items: [{
				flex: 3, name: 'fio_fam', fieldLabel: 'Фамилия', margins: { left: 5, right: 5 },
			},{
				flex: 2, name: 'fio_nam', fieldLabel: 'Имя',
			},{
				flex: 3, name: 'fio_oth', fieldLabel: 'Отчество',
			}]
		},{
			xtype: 'textfield', labelAlign: 'top', height: 44, margins: { left: 5, right: 5 },
			name: 'post', fieldLabel: 'Должность'
		},{
			xtype: 'label', text: 'Контакты:', height: 18, margins: { left: 5 },
		},{
			border: true, flex: 2, xtype: 'gridpanel', margins: { left: 5, right: 5, bottom: 5 },
			hideHeaders: true,
			height: 200,
			listeners: {
				'selectionchange': function(view, records) {
					this.down('#delContact').setDisabled(!records.length);
				}
			},
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
					itemId: 'rowEdit',
					clicksToEdit: 2,
				})
			],
			tbar: [{
				xtype: 'button', itemId: 'addContact', text: 'Добавить',
			},{
				xtype: 'button', itemId: 'delContact', text: 'Удалить', disabled: true, handler: function(){
					var grid = this.up('gridpanel');
					var store = grid.getStore();
					var sm = grid.getSelectionModel();
					store.remove(sm.getSelection());
					sm.select(0);
					
				}
			}],
			store: {
				model: 'App.model.Contact',
			},
			columns: [
				{ header: 'тип', dataIndex: 'cntType', flex:1 , field: { xtype: 'combobox',
					displayField: 'name', queryMode: 'local',
					store: {
						fields: [ 'name' ],
						data: [
							{ name: 'Рабочий телефон' },
							{ name: 'Домашний телефон' },
							{ name: 'Сотовый телефон' },
							{ name: 'Факс' },
							{ name: 'E-mail' },
							{ name: 'ICQ' },
							{ name: 'Skype' },
							{ name: 'WWW' },
						]
					}
				} },
				{ header: 'контакт', dataIndex: 'cnt', flex:2 , field: { xtype: 'textfield' } },
			]
		},{
			flex:1, xtype: 'textarea', labelAlign: 'top', margins: { left: 5, right: 5 },
			fieldLabel: 'Комментарий'
		}]
	}); this.callParent(arguments) }
});
