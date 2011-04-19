Ext.define('App.view.org.My', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.orgMy',
	store: 'Orgs',

	title: 'Мои организации',

	initComponent: function(){
		
		this.columns = [{
			header: 'Name', dataIndex: 'Name', flex:1
		},{
			header: 'City', dataIndex: 'City', flex:1
		},{
			header: 'Area', dataIndex: 'Area', flex:1
		}];

		this.callParent(arguments);
	}
});
