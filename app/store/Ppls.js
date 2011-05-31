Ext.define('App.store.Ppls', {
	extend: 'Ext.data.Store',
	model: 'App.model.Ppl',

	//autoLoad: true,
	remoteFilter: true,

	proxy: {
		type: 'direct',
		directFn: '$$$Ppls.getPpl',
	}
});

var Schema = Mongoose.Schema,
		ObjectId = Schema.ObjectId,
		Query = Mongoose.Query,
    fs = require('fs'),
		util = require( 'util');

Ext.endpoint('getPpl', function(){
	console.log('**** getPpl');
	this.success({ a: '123'});
});
