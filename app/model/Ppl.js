Ext.define('App.model.Ppl', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: '_id', type: 'string' },
		{ name: 'fio', type: 'string' },
		{ name: 'post', type: 'string' },
		{ name: 'name', type: 'string' },
	],

	belongsTo: 'Org',
	//hasMany: 'Contacts',

});


