Ext.define('App.store.Tyres', {
    extend: 'Ext.data.Store',
		model: 'App.model.Tyre',

		autoLoad: true,
		remoteFilter: true,

		proxy: { type: 'ajax', url: '/srv/some' },
		
		load: function(options){
			this.callParent([function(records, succ){
				// this.group('brand');
			}]);
		},

});
