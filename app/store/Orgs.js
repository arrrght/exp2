Ext.define('App.store.Orgs', {
	extend: 'Ext.data.Store',
	model: 'App.model.Org',

	autoLoad: true,
	remoteFilter: true,

	proxy: {
		type: 'direct',
		directFn: '$$$Orgs.getOrgs',
	}
});

var Schema = Mongoose.Schema,
		ObjectId = Schema.ObjectId,
		Query = Mongoose.Query,
    fs = require('fs'),
		util = require('util');

Ext.endpoint('getOrgs', function(para){
	if(para.data && __.isArray(para.data)){
		var ret = this,
		    prm = para.data.shift(),
		    limit = (prm.limit && typeof prm.limit === 'number' && prm.limit > 3) ? prm.limit : 5,
		    filters = Ext.decodeFilters(prm.filter);

		var Org = Mongoose.model('Org');
		Org.find( filters, {}, { limit: limit }, function(err, docs){
			ret.success(docs);
		});
	}else{
		this.failure('Param error');
	}
});
