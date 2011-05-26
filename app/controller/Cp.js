Ext.define('App.controller.Cp', {
	extend: 'Ext.app.Controller',

	models: [ 'Tyre' ],
	stores: [ 'Tyres' ],

	requires: [ 'App.view.Cp' ],

	refs: [
		{ ref: 'cpTyre', selector: 'cpTyre' },
	],

	init: function() {
		this.filterTyre = Ext.Function.createBuffered(filterTyre, 400);
		this.control({
			'cpTyre textfield[name=smart]': {
				change: this.filterTyre
			},
			'cpTyre': {
				itemdblclick: function(v, r){
					this.fromRecToSet(v, r, 'tyreSet', 'brand name sizeName tra');
				}
			},
			'cpPpl': {
				itemdblclick: function(v, r){
					this.fromRecToSet(v, r, 'pplSet', 'fio post');
				}
			},
			'button[action=create]': {
				click: this.createCp
			}
		})
	},

	createCp: function(btn){
		var form = btn.up('window').down('form').getForm();
		console.log(Cp);
		form.submit({
			url: '/some',
			success: function(){
				console.log('on succ');
			}
		});
	},

	fromRecToSet: function(view, record, fsName, fNames){
		var a = view.up('window').down('fieldset[name=' + fsName + ']');
		a.bindedRec = record;
		fNames.split(' ').forEach(function (i){
			a.down('textfield[name=' + i + ']').setValue(record.get(i));
		});
	},

});

Ext.endpoint('createCp', function(){
	//
});
