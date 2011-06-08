// Контакты
Ext.define('App.view.org.Contacts', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.orgContacts',
	store: 'Ppls',

	plugins: [{
		tpl: function(data){
			if (!data.contacts.length>0){ return '<p class="ppl-add-info"><b>Нет контактов</b></p>' };
			var ret = '<p class="ppl-add-info">';
			data.contacts.forEach(function(a){
				ret += '<b>' + a.cntType + ': </b>' + a.cnt + ', ';
			});
			return ret.slice(0,-2) + '</p>';
		},
		ptype: 'rowexp'
	}],

	initComponent: function(){
		Ext.apply(this, {
			title: 'Контакты',
			tbar: [{ text: 'Новый контакт', xtype: 'button' }],
			columns: [{
				flex: 3, text: 'ФИО', dataIndex: 'fio_fam', 
			},{
				flex: 2, text: 'Должность', dataIndex: 'post',
			},
			//{ flex: 2, text: 'Дата последнего контакта', dataIndex: 'dat', renderer: Ext.util.Format.dateRenderer('d F Y, H:i') }
			],
		}); this.callParent(arguments);
	}
});
