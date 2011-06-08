Ext.define('App.model.Ppl', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: '_id', type: 'string' },
		{ name: 'fio_fam', type: 'string' },
		{ name: 'fio_nam', type: 'string' },
		{ name: 'fio_oth', type: 'string' },
		{ name: 'post', type: 'string' },
		{ name: 'name', type: 'string' },
	],

	belongsTo: 'Org',
	//hasMany: 'Contacts',

});

// Code for Mongoose
var Schema = Mongoose.Schema,
    crypto = require('crypto'),
		ObjectId = Schema.ObjectId,
		Query = Mongoose.Query,
		fields = Ext.getModel('Ppl'),
		Contacts = new Schema({
				cntType: String,
				cnt: String,
		});

fields.contacts = [ Contacts ];
var Ppl = new Schema(fields);
Mongoose.model('Ppl', Ppl);

