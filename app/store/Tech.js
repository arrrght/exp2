Ext.define('App.store.Tech', {
    extend: 'Ext.data.Store',
		model: 'App.model.Tech',

		autoLoad: true,
		remoteFilter: true,

		proxy: { type: 'ajax', url: '/srv/tech' },

});
