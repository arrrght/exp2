// Контакты
Ext.define('App.view.org.Contacts', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.orgContacts',
	store: 'Ppls',

	plugins: [{
		tpl: function(data){
			if (!data.contacts.length>0){ return '<p class="ppl-add-info"><b>Нет контактов</b></p>' };
			var ret = '<p class="ppl-add-info">';
			//for(var a in data.add){ ret += '<b>' + a + ': </b>' + data.add[a] + ', ' };
			data.contacts.forEach(function(a){
				ret += '<b>' + a.type + ': </b>' + a.content + ', ';
			});
			return ret.slice(0,-2) + '</p>';
		},
		ptype: 'rowexp'
	}],

	initComponent: function(){
		Ext.apply(this, {
			title: 'Контакты',
			tbar: [{ text: 'Новый контакт', xtype: 'button' }],

			/*
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
			*/

			columns: [{
				flex: 3, text: 'ФИО', dataIndex: 'fio', 
			},{
				flex: 2, text: 'Должность', dataIndex: 'post',
			},
			//{ flex: 2, text: 'Дата последнего контакта', dataIndex: 'dat', renderer: Ext.util.Format.dateRenderer('d F Y, H:i') }
			],
			//viewConfig: { forceFit: true, itemTpl: 'asdasdasd' }
		}); this.callParent(arguments);
	}
});
