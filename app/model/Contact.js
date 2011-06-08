Ext.define('App.model.Contact', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: 'id', type: 'string' },
		{ name: 'cntType', type: 'string' },
		{ name: 'cnt', type: 'string' },
	],

	//belongsTo: 'Ppl',

});
