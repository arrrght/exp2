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
		util = require( 'util');
		

Ext.endpoint('getOrgInfo', function(para){
	console.log(para);
	if(para.data && __.isArray(para.data)){
		var ret = this,
		    prm = para.data.shift(),
		    Org = Mongoose.model('Org'),
		    Ppl = Mongoose.model('Ppl');

		Org.findById( prm.id, function(err, org){
			if (org){
				Ppl.find({ orgId: org._id }, function(err, ppls){
					var result = org.doc;
					result.ppls = ppls;
					ret.success(result);
				});
			}
		});
	}else{
		this.failure('Param error');
	}
});
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
