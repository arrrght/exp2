Ext.define('App.view.org.AddContact',{
	extend: 'Ext.window.Window',
	alias: 'orgAddContact',

	initComponent: function(){ Ext.apply(this, {
		modal: true, maximizable: true, 
		height: 450, width: 600, //border: false,
		layout: { type: 'vbox', align: 'stretch' },
		defaults: { height: 44, xtype: 'container', layout: 'hbox', border: false },
		bbar: ['->', {
			xtype: 'button', text: 'Сохранить изменения'
		},'-',{
			xtype: 'button', text: 'Отмена'
		}],
		items: [{
			margins: { top: 5 },
			defaults: { flex:1, xtype: 'textfield', labelAlign: 'top', margins: { right: 5 } },
			items: [{
				flex: 3, fieldLabel: 'Фамилия', margins: { left: 5, right: 5 },
			},{
				flex: 2, fieldLabel: 'Имя',
			},{
				flex: 3, fieldLabel: 'Отчество',
			}]
		},{
			xtype: 'textfield', labelAlign: 'top', height: 44, margins: { left: 5, right: 5 },
			fieldLabel: 'Должность'
		},{
			xtype: 'label', text: 'Контакты:', height: 18, margins: { left: 5 },
		},{
			border: true, flex: 2, xtype: 'gridpanel', margins: { left: 5, right: 5, bottom: 5 },
			hideHeaders: true,
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
					itemId: 'rowEdit',
					clicksToEdit: 2,
				})
			],
			listeners: {
				'selectionchange': function(view, records) {
					this.down('#del').setDisabled(!records.length);
				}
			},
			tbar: [{
				xtype: 'button', itemId: 'add', text: 'Добавить', handler: function(){
					var grid = this.up('gridpanel'),
					    rowEdit = grid.getPlugin(),
					    r = Ext.ModelManager.create({ cntType: 'Рабочий телефон', cnt: '' }, 'App.model.PplContact');
					grid.getStore().insert(0, r);
					rowEdit.startEdit(0,0);
					grid.doLayout();
				}
			},{
				xtype: 'button', itemId: 'del', text: 'Удалить', disabled: true
			}],
			store: {
				model: 'App.model.PplContact',
				data: [
					{ cntType: 'Рабочий телефон', cnt: '+7 495 123 45 6' },
					{ cntType: 'E-mail', cnt: 'aaa@gmail.com' },
					{ cntType: 'ICQ', cnt: '123441141' },
					{ cntType: 'Skype', cnt: '123441141' },
				]
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
