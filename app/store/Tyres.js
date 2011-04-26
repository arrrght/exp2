Ext.define('App.store.Tyres', {
    extend: 'Ext.data.Store',
		model: 'App.model.Tyre',

		//pageSize: 50,
		//purgePageCount: 0,

		//groupField: 'brand',
		autoLoad: true,

		proxy: {
			//type: 'localstorage', id: 'tyres'
			type: 'ajax', url: '/srv/some'
			//type: 'memory'
		},
		
		load: function(options){
			this.callParent([function(records, succ){
				// this.cacheRecords(records);
				// this.guaranteeRange(0, 50);
				//this.group('brand');
			}]);
		},

		constructor: function(){
			var me = this;
			me.callParent(arguments);
		},

});
