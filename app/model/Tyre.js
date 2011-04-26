Ext.define('App.model.Tyre', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: '_id', type: 'string' },
		{ name: 'brand', type: 'string' }, // Bridgestone
		{ name: 'name', type: 'string' },  // VKT
		{ name: 'posD', type: 'float' },  // 25
		//{ name: 'hS', type: 'string' },    // 25/65, 26.5
		{
			name: 'hS', type: 'string', convert: function(val, record){
				return (val + record.data.tp + record.data.posD);
				//console.log(val, record);
			}
		},
		{ name: 'tType', type: 'string' }, // Tubeless
		{ name: 'lay', type: 'string' },   // 1*, 2*
		{ name: 'tra', type: 'string' },   // E2/L2
		{ name: 'd', type: 'float' },     // 1486
		{ name: 's', type: 'float' },     // 635
		{ name: 'tp', type: 'string' },     // Tyre's type: R or -
	],

});
