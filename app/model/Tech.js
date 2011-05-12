Ext.define('App.model.Tech', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: '_id', type: 'string' },
		{ name: 'typ', type: 'string' }, // Тип техники: погрузчики / самосвалы
		{ name: 'brand', type: 'string' }, // Volvo
		{ name: 'name', type: 'string' },  // L120C
		{ name: 'sizes', type: 'string' },  // 15.5,17.5
	],

});
