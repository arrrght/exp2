Ext.define('App.view.chooserTechTyre.Tyre', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.chooserTyre',
	store: 'Tyres',

	features: [{ ftype: 'grouping' }],

	initComponent: function(){
		Ext.apply(this, {

			invalidateScrollerOnRefresh: false,

			tbar: [{
				xtype: 'textfield', name: 'smart', emptyText: 'Поиск по шинам', flex:1
			}],

			bbar: [{
				xtype: 'tbtext', name: 'info', text: 'Параметры поиска', flex: 2
			}],

			columns:  [
			{ header: 'Брэнд', dataIndex: 'brand', flex:1 },
			{ header: 'Размер', dataIndex: 'hS', flex:1 },
			// { header: 'Тип', dataIndex: 'tType', flex:1 },
			{ header: 'Слойность', dataIndex: 'lay', flex:1 },
			{ header: 'Тип протектора', dataIndex: 'tra', flex:1 },
			{ header: 'Имя', dataIndex: 'name', flex:1 },
			// { header: 'Диаметер', dataIndex: 'd', flex:1 },
			// { header: 'Ширина', dataIndex: 's', flex:1 }
			]

		}); this.callParent(arguments);
	}

});
