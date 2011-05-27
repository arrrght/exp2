Ext.define('App.view.org.My', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.orgMy',
	store: 'Orgs',

	title: 'Мои организации',

	initComponent: function(){
		
		this.columns = [{
			header: 'Название', dataIndex: 'name', flex:1
		},{
			header: 'Город', dataIndex: 'city', flex:1
		},{
			header: 'Адрес', dataIndex: 'addr', flex:1
		}];

		this.callParent(arguments);
	}
});
