Ext.define('App.model.Org', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: '_id', type: 'string' },
		{ name: 'name', type: 'string' },
		// округ
		{ name: 'area', type: 'string' },
		{ name: 'city', type: 'string' },
		// область
		{ name: 'province', type: 'string' },
		{ name: 'zip', type: 'string' },
		{ name: 'street', type: 'string' },
		{ name: 'house', type: 'string' },
		{ name: 'liter', type: 'string' },
		{ name: 'office', type: 'string' },
		{ name: 'addr', type: 'string' },
		{ name: 'rem', type: 'string' }
	],

	hasMany: 'Ppls',

});
