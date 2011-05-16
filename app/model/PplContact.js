Ext.define('App.model.PplContact', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: 'id', type: 'string' },
		{ name: 'ppl', type: 'string' },
		{ name: 'cntType', type: 'string' },
		{ name: 'cnt', type: 'string' },
	],

});
