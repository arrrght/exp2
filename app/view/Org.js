Ext.define('App.view.Org', {
	extend: 'Ext.window.Window',
	alias: 'widget.orgWin',

	requires: [
		'App.view.ChooserTechTyre',
		'App.view.org.ExistsBase'
	],

	initComponent: function(){ Ext.apply(this, {
		modal: true,

		bbar: ['->',{ 
			xtype: 'button', text: 'Изменить', action: 'changeTab'
		},'-',{
			xtype: 'button', text: 'Сохранить карточку организации'
		}],

		title: 'Редактирование карточки предприятия, Время [ у нас - 13:40, у них - 18:40 ]',
		height: 430, width: 800, layout: 'fit',
		bodyStyle: 'background-color: #DFE8F6; padding:5px 5px 5px 5px;',

		items: [{
			xtype: 'tabpanel', layout: 'fit',
			activeItem: 4, activeTab: 4,
			items: [ 
				{ xtype: 'orgBaseInfo', tabName: 'info' },
				{ xtype: 'orgContacts', tabName: 'contacts' },
				{ title: 'Договора', tabName: 'contracts', html: 'Договора' },
				{ title: 'Продажи', tabName: 'sales', html: 'Продажи' },
				{ title: 'Техническая база', tabName: 'techBase', xtype: 'existsBase' },
				{ title: 'Отчеты', tabName: 'reports', html: 'Отчеты' },
			]
		}]
	}); this.callParent(arguments); }
});

// Grid plugin for Contacts
Ext.define('App.grid.plugin.RowExp', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.rowexp',

	tpl: 'Template missing',

	constructor: function(){
		this.callParent(arguments);
		var tplFn = this.tpl,
				grid = this.getCmp();

		grid.features = [{
			ftype: 'rowbody',
			getAdditionalData: function(data, idx, record, orig) {
				var o = Ext.grid.feature.RowBody.prototype.getAdditionalData.apply(this, arguments);
				o.rowBody = tplFn(data);
				return o;
			},
		},
		{ ftype: 'rowwrap' }
		];

	}
});

// Контакты
Ext.define('App.view.Org.Contacts', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.orgContacts',

	plugins: [{
		tpl: function(data){
			if (!data.add){ return null };
			var ret = '<p class="ppl-add-info">';
			for(var a in data.add){ ret += '<b>' + a + ': </b>' + data.add[a] + ', ' };
			return ret.slice(0,-2) + '</p>';
		},
		ptype: 'rowexp'
	}],

	initComponent: function(){
		Ext.apply(this, {
			title: 'Контакты',
			tbar: [{ text: 'Новый контакт', xtype: 'button' }],

			store: new Ext.data.Store({
				fields: [
					{ name: 'fio' },
					{ name: 'dolg' },
					{ name: 'dat', type: 'date' },
					{ name: 'add' },
				],
				data: [
					{ fio: 'Иванов И.И.', dolg: 'директор', dat: '2011/01/01 12:11', add: { 'ICQ': '123311133', 'Рабочий телефон': '(343) 231-13-12' }  },
					{ fio: 'Петров П.П.', dolg: 'менеджер', dat: '2011/03/03 1:11', add: { 'Email': 'add@mail.com', 'Комментарий': 'Звонить только до обеда - потом оно спит' } },
					{ fio: 'Сидоров С.С.', dolg: 'бухгалтер', dat: '2010/07/07 12:12', add: { 'Сотовый': '+7 922 11 23 871', 'Комм': 'Пропал, трудку не берет, женился штоле?'} },
				]
			}),
			columns: [{
				flex: 3, text: 'ФИО', dataIndex: 'fio', 
			},{
				flex: 2, text: 'Должность', dataIndex: 'dolg',
			},{
				flex: 2, text: 'Дата последнего контакта', dataIndex: 'dat', renderer: Ext.util.Format.dateRenderer('d F Y, H:i')
			}],
			viewConfig: { forceFit: true, itemTpl: 'asdasdasd' }
		}); this.callParent(arguments);
	}
});

// Основная инфа
Ext.define('App.view.Org.BaseInfo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.orgBaseInfo',

	initComponent: function(){
		Ext.apply(this, {
			title: 'Основная информация', xtype: 'form', bodyStyle: 'background-color:#DFE8F6; padding: 5px;',
			layout: { type: 'vbox', align: 'stretch' },
			defaults: { height: 44, xtype: 'container', bodyStyle: 'background-color:#DFE8F6;', layout: 'hbox', border: false },
			items: [{
				defaults: { flex:1, xtype: 'textfield', labelAlign: 'top' },
				items: [{
					flex: 3, fieldLabel: 'Название',// margins: { right: 5 },
				},
				/*
				{
					fieldLabel: 'Форма', margins: { right: 5 },
				},{
					flex: 5, fieldLabel: 'Юридическое название'
				}
				*/
				]
			},
			/* Убрать в договора ИНН КПП, а в контакты - ФИО рук и должность
			{
				defaults: { flex:1, xtype: 'textfield', labelAlign: 'top' }, 
				items: [{
					flex:2, fieldLabel: 'ИНН', margins: { right: 5 },
				},{
					flex:2, fieldLabel: 'КПП', margins: { right: 5 },
				},{
					flex:3, fieldLabel: 'Должность руководителя', margins: { right: 5 },
				},{
					flex:4, fieldLabel: 'ФИО руководителя'
				}]
			},
			*/
			{
				defaults: { flex:1, xtype: 'textfield', labelAlign: 'top' }, 
				items: [{
					fieldLabel: 'Округ', margins: { right: 5 },
				},{
					fieldLabel: 'Область', margins: { right: 5 },
				},{
					fieldLabel: 'Город'
				}]
			},{
				defaults: { flex:1, xtype: 'textfield', labelAlign: 'top' }, 
				items: [{
					fieldLabel: 'Индекс', margins: { right: 5 },
				},{
					flex:3, fieldLabel: 'Улица', margins: { right: 5 },
				},{
					fieldLabel: 'Дом', margins: { right: 5 },
				},{
					fieldLabel: 'Литера', margins: { right: 5 },
				},{
					fieldLabel: 'Офис', margins: { right: 5 },
				},{
					flex: 5, fieldLabel: 'Выш. организация'
				}]
			},{
				flex:3, layout: { type: 'vbox', align: 'stretch' }, 
				items: [{
					layout: { type: 'hbox', align: 'stretch' }, border: false, bodyStyle: 'background-color:#DFE8F6;', flex:1, 
					items: [{
						flex:3, fieldLabel: 'Классификатор', xtype: 'textarea', margins: { right: 5 }, labelAlign: 'top',
					},{
						flex:2, fieldLabel: 'Равноправные организации', xtype: 'textarea', margins: { right: 5 }, labelAlign: 'top'
					},{
						flex:2, fieldLabel: 'Филиалы', xtype: 'textarea', labelAlign: 'top'
					}]
				}]
			},{
				height: 90, fieldLabel: 'Комментарий', xtype: 'textarea', labelAlign: 'top'
			}]
		}); this.callParent(arguments);
	}
});
