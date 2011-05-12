Ext.define('App.controller.ChooserTechTyre', {
	extend: 'Ext.app.Controller',

	stores: [ 'Tyres', 'Tech' ],
	models: [ 'Tyre', 'Tech' ],

	refs: [
		{ ref: 'chooserTyre', selector: 'chooserTyre' },
		{ ref: 'chooserTech', selector: 'chooserTech' },
		{ ref: 'existsTech', selector: 'existsTech' },
		{ ref: 'existsTyre', selector: 'existsTyre' }
	],

	requires: [ 'App.view.ChooserTechTyre' ],

	init: function() {
		this.filterTyre = Ext.Function.createBuffered(this.filterTyre, 400);
		this.filterTech = Ext.Function.createBuffered(this.filterTech, 400);
		this.control({
			'existsTech': {
				itemcontextmenu: this.removeThat,
				selectionchange: function(view, records){
					if(records.length){
						this.getChooserTyre().down('textfield[name=smart]').setValue(records[0].data.sizes);
					}
				}
			},
			'existsTyre': {
				itemcontextmenu: this.removeThat
			},
			'chooserTyre': {
				itemdblclick: function(view, record){
					var exTyreStore = this.getExistsTyre().getStore(),
					    oldRec = exTyreStore.findRecord('_id', record.data._id);

					if (oldRec){
						oldRec.set('count', parseInt(oldRec.get('count')) + 1);
					}else{
						var data = Ext.apply(record.data, { count: 1 });
						exTyreStore.add(data);
					}
				}
			},
			'chooserTech': {
				itemdblclick: function(view, record){
					var exTechStore = this.getExistsTech().getStore(),
					    oldRec = exTechStore.findRecord('_id', record.data._id);

					if (oldRec){
						oldRec.set('count', parseInt(oldRec.get('count')) + 1);
					}else{
						var data = Ext.apply(record.data, { count: 1 });
						exTechStore.add(data);
					}
				},
				selectionchange: function(view, records){
					if (records.length){
						this.getChooserTyre().down('textfield[name=smart]').setValue(records[0].data.sizes);
					}
				}
			},
			'chooserTyre textfield[name=smart]': {
				change: this.filterTyre
			}
		});
	},

	removeThat: function(view, record, item, index, e){
		e.stopEvent();
		var m = Ext.create('Ext.menu.Menu',{
			items: [{
				text: 'Удалить', handler: function(){
					record.store.remove(record);
				}
			}]
		}).showAt(e.getXY());
	},

	filterTech: function(){
		var t = this.getChooserTech().down('textfield[name=smart]').getValue().split(/ /),
		    store = this.getTechStore(),
				info = this.getChooserTech().down('tbtext[name=info]'),
				regVals = {
					typ: { name: 'Тип', rr: [
						'по', 'Погрузчики', 'gj', 'Погрузчики', 'са', 'Самосвалы', 'cf', 'Самосвалы'
					]},
					brand: { name: 'Брэнд', rr: [
						'At', 'Atlas', 'ca', 'Caterpillar', 'dr', 'Dressta', 'eu', 'Euclid', 'hi', 'Hitachi',
						'hy', 'Hyundai', 'hu', 'Hyundai', 'ko', 'Komatsu', 'le', 'LeTourneau', 'tu', 'Letourneau',
						'li', 'Libherr', 'te', 'Terex', 'vo', 'Volvo'
					]},
				},
				infoText = '',
				filters = [];

		function rRun(value, rName){
			var originalValue = value,
			    rArr = regVals[rName].rr;

			for(var r=0; r<rArr.length; r++){
				value = value.replace(new RegExp('^'+rArr[r]+'.+','i'), rArr[++r]);
			}
			if (originalValue != value){
				infoText += regVals[rName].name + ' ' + value + ', ';
				filters.push({ property: rName, value: value });
			}
			return originalValue == value;
		}

		t.forEach(function(i){ if(i){
			if (rRun(i, 'typ')){ // Check for type first
				if (rRun(i, 'brand')){ // Now brand
					// Name is at last
					infoText += 'Имя ' + i + ', ';
					filters.push({ property: 'name', value: i });
				}
			}
		}});

		infoText = infoText.replace(/,\ $/,'');
		infoText = infoText.length ? 'Поиск: ' + infoText : '';
		info.setText(infoText);

		// clearFilter() reload db. Bitch.
		store.filters.items = [];
		store.filter(filters);
	},

	filterTyre: function(){
		var t = this.getChooserTyre().down('textfield[name=smart]').getValue().split(/ /),
				store = this.getTyresStore(),
				info = this.getChooserTyre().down('tbtext[name=info]'),
				rInt = [
					[ /00/, '.00' ], [ 'ю', '.' ], [ '..', '.' ], [ 'р', 'R' ], [ 'r', 'R' ], [ 'к', 'R' ]
				],
				rStr = [
					[ /br.+/, 'Bridgestone' ], [ /бр.+/, 'Bridgestone' ], [ /гу.+/, 'GoodYear' ],[ /go.+/, 'GoodYear' ], 
					[ /ми.+/, 'Michelin'], [ /mi.+/, 'Michelin'], [/фа.+/, 'Firestone'], [/fi.+/, 'Firestone']
				],
				infoText = '',
				filters = [];

		t.forEach(function(i){
			i = i.replace(/,+/g, '');
			if(i){
				if(i[0].search(/\d/)>=0){
					// Размер
					rInt.forEach(function(r){
						i = i.replace(r[0],r[1]);
					});
					infoText+= ' Размер ' + i + ', ';
					filters.push({ property: 'hS', value: i });
				}else{
					if (i[0].search(/[-rр]/i)>=0){
						// Размер тип ( диаг/рад )
						i = i.replace(/[рr]/, 'R');
						infoText+= ' Размер ' + i + ', ';
						filters.push({ property: 'posD', value: parseInt(i.substr(1)) });

					} else if (i[0].search(/[LETлет]/i)>=0 && i.length<3 ){
						// Тип протектора
						var a = 'лLеEтTсS'.split('');
						for(var r=0; r<a.length; r++){
							i = i.replace(new RegExp(a[r++],'g'), a[r]).toUpperCase();
						}

						if(i.length>1){
							filters.push({ property: 'tra', value: i });
							infoText+= ' Тип протектора ' + i + ', ';
						}
					}else{
						// Брэнд
						rStr.forEach(function(r){
							i = i.replace(r[0],r[1]);
						});
						infoText+= ' Брэнд ' + i + ', ';
						filters.push({ property: 'brand', value: i });
					}
				}
			}
		});
		infoText = infoText.replace(/,\ $/,'');
		infoText = infoText.length ? 'Поиск: ' + infoText : '';
		info.setText(infoText);

		// clearFilter() reload db. Bitch.
		store.filters.items = [];
		store.filter(filters);
	},

});
