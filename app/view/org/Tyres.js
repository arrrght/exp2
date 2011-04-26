Ext.define('App.view.org.Tyres', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.orgWinTyres',
	store: 'Tyres',

	features:
	[{
		ftype: 'grouping'
	}],
	

	initComponent: function(){
		Ext.apply(this, {

			tbar: ['-',{
				//bodyStyle: 'padding: 55px 0 0 0;',
				xtype: 'textfield', name: 'smart', emptyText: 'Как бы умный поиск', flex:1, padding: { right: 50 }
			},'-'],

			bbar: [
				{
					xtype: 'button', action: 'tst1', text: 'TST1'
				},{
					xtype: 'button', action: 'tst2', text: 'TST2'
				}, '-',{
					xtype: 'tbtext', name: 'info', text: 'Search info', flex: 1
				}, '-'
			],

			/*
			verticalScroller: {
				xtype: 'paginggridscroller',
				activePrefetch: false
			},
			*/
			
			//loadMask: true,
			//disableSelection: true,
			//invalidateScrollerOnRefresh: false,
			//viewConfig: { trackOver: false },
			
		
			columns:  [{
				header: 'Брэнд', dataIndex: 'brand', flex:1
			},{
				header: 'Размер', dataIndex: 'hS', flex:1
			},{
				header: 'Тип', dataIndex: 'tType', flex:1
			},{
				header: 'Слойность', dataIndex: 'lay', flex:1
			},{
				header: 'TRA', dataIndex: 'tra', flex:1
			},{
				header: 'Диаметер', dataIndex: 'd', flex:1
			},{
				header: 'Ширина', dataIndex: 's', flex:1
			}]

		}); this.callParent(arguments);
	}

});
