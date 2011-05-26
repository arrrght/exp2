Ext.define('App.store.Tyres', {
    extend: 'Ext.data.Store',
		model: 'App.model.Tyre',

		autoLoad: true,
		remoteFilter: true,

		proxy: {
			type: 'direct',
			directFn: '$$$Tyres.getTyres',
		},

});

var Schema = Mongoose.Schema,
		ObjectId = Schema.ObjectId,
		Query = Mongoose.Query,
    fs = require('fs'),
		util = require('util');

Ext.endpoint('getTyres', function(para){
	if(para.data && __.isArray(para.data)){
		var ret = this,
		    prm = para.data.shift(),
		    limit = (prm.limit && typeof prm.limit === 'number' && prm.limit > 3) ? prm.limit : 5,
		    filters = Ext.decodeFilters(prm.filter);

		var Tyre = Mongoose.model('Tyre');
		Tyre.find( filters, {}, { limit: limit }, function(err, docs){
			ret.success(docs);
		});

	}else{
		this.failure('Param error');
	}
});
