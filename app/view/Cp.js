Ext.define('App.view.Cp', {
	extend: 'Ext.window.Window',
	alias: 'widget.cp',

	initComponent: function(){
	Ext.apply(this, {
		modal: true,
		title: 'Коммерческое предложение',
		height: 430, width: 800,
		layout: { type: 'hbox', align: 'stretch' },
		defaults: { border: false },
		bbar: [
			'->', { xtype: 'button', text: 'Создать', action: 'create' }
		],
		items: [{
				flex: 2, xtype: 'container', 
				layout: { type: 'accordion' },
				items: [
					{ title: 'Шины [производитель, модель...]', xtype: 'cpTyre' },
					{ title: 'Кому [ФИО, должность]', xtype: 'cpPpl' }
				]
			},{
				xtype: 'splitter',
			},{
				flex: 3, xtype: 'form',
				api: { submit: Cp.createCp },
				layout: { type: 'vbox', align: 'stretch' },
				bodyStyle: 'background-color:#DFE8F6; padding: 5px;',
				defaults: { anchor: '100%', xtype: 'textfield', labelAlign: 'left' }, 
				items: [{
					xtype: 'fieldset', title: 'Шина', name: 'tyreSet',
					defaults: { xtype: 'textfield', anchor: '100%' },
					items: [
						{ name: 'brand', fieldLabel: 'Производитель' },
						{ name: 'name', fieldLabel: 'Модель' },
						{ name: 'sizeName', fieldLabel: 'Размерность' },
						{ name: 'tra', fieldLabel: 'Классификация' }
					]
				},{
					xtype: 'fieldset', title: 'Кому', name: 'pplSet',
					defaults: { xtype: 'textfield', anchor: '100%' },
					items: [
						{ name: 'fio', fieldLabel: 'ФИО' },
						{ name: 'post', fieldLabel: 'Должность' }
					]
				},{
					fieldLabel: 'Цена', name: 'price',
				},{
					fieldLabel: 'Исх. №', name: 'num',
				},{
					flex: 1, xtype: 'textarea', fieldLabel: 'Комментарий', name: 'rem'
				}]
			}
		]

	}); this.callParent(arguments); }
});

Ext.define('App.view.cp.Ppl', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.cpPpl',
	border: false,
	store: new Ext.data.Store({
		fields: [ 'fio', 'post' ],
		data: [
			{ fio: 'asdasd', post: 'asdasd' },
			{ fio: 'asdasd', post: 'asdasd' },
			{ fio: 'asdasd', post: 'asdasd' },
			{ fio: 'asdasd', post: 'asdasd' },
		]
	}),

	initComponent: function(){ Ext.apply(this, {
		border: false,
		columns:  [
			{ header: 'ФИО', dataIndex: 'fio', flex: 1 },
			{ header: 'Должность', dataIndex: 'post', flex: 1 },
		]
	}); this.callParent(arguments); }

});
Ext.define('App.view.cp.Tyre', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.cpTyre',
	store: 'Tyres',

	features: [{ ftype: 'grouping' }],

	initComponent: function(){ Ext.apply(this, {
		border: false,
		tbar: [{
			xtype: 'textfield', name: 'smart', emptyText: 'Поиск по шинам', flex:1
		}],
		bbar: [{
			xtype: 'tbtext', name: 'info', text: 'Параметры поиска', flex: 1
		}],
		columns:  [
			{ header: 'Брэнд', dataIndex: 'brand', flex:2 },
			{ header: 'Размер', dataIndex: 'hS', flex:2 },
			{ header: 'Слойность', dataIndex: 'lay', flex:1 },
			{ header: 'Тип протектора', dataIndex: 'tra', flex:1 },
			{ header: 'Имя', dataIndex: 'name', flex:1 },
		]
	}); this.callParent(arguments); }

});
