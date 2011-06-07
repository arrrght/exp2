Ext.define('App.view.Org', {
	extend: 'Ext.window.Window',
	alias: 'widget.orgWin',

	requires: [
		'App.view.ChooserTechTyre',
		'App.view.org.ExistsBase',
		'App.view.org.Contacts'
	],

	setOrgId: function(id){
		console.log(id);
	},

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
			activeItem: 1, activeTab: 1,
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
					flex: 3, fieldLabel: 'Название', name: 'name' // margins: { right: 5 },
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
					fieldLabel: 'Округ', name: 'area', margins: { right: 5 },
				},{
					fieldLabel: 'Область', name: 'province', margins: { right: 5 },
				},{
					fieldLabel: 'Город', name: 'city'
				}]
			},{
				defaults: { flex:1, xtype: 'textfield', labelAlign: 'top' }, 
				items: [{
					fieldLabel: 'Индекс', name: 'zip', margins: { right: 5 },
				},{
					flex:3, fieldLabel: 'Улица', name: 'street', margins: { right: 5 },
				},{
					fieldLabel: 'Дом', name: 'house', margins: { right: 5 },
				},{
					fieldLabel: 'Литера', name:'liter', margins: { right: 5 },
				},{
					fieldLabel: 'Офис', name: 'office', margins: { right: 5 },
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
				height: 90, fieldLabel: 'Комментарий', name: 'rem', xtype: 'textarea', labelAlign: 'top'
			}]
		}); this.callParent(arguments);
	}
});
