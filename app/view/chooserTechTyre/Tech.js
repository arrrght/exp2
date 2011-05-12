Ext.define('App.view.chooserTechTyre.Tech', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.chooserTech',
	store: 'Tech',

	features: [{ ftype: 'grouping' }],

	initComponent: function(){
		Ext.apply(this, {

			invalidateScrollerOnRefresh: false,

			tbar: [{
				xtype: 'textfield', name: 'smart', emptyText: 'Поиск по технике', flex:1
			}],

			bbar: [{
				xtype: 'tbtext', name: 'info', text: 'Параметры поиска', flex: 2
			}],

			columns:  [
				{ header: 'Тип техники', dataIndex: 'typ', flex:1 },
				{ header: 'Брэнд', dataIndex: 'brand', flex:1 },
				{ header: 'Имя', dataIndex: 'name', flex:2 },
			]

		}); this.callParent(arguments);
	}

});
