Ext.define('App.controller.Apps', {
	extend: 'Ext.app.Controller',

	stores: [ 'Orgs', 'Tyres' ],
	models: [ 'Org', 'Tyre' ],
	//views: [ 'org.Tyres' ],
	refs: [
		{ ref: 'orgWinTyres', selector: 'orgWinTyres' }
	],

	requires: [ 'App.view.Org' ],

	init: function() {
		this.filterMe = Ext.Function.createBuffered(this.filterMe, 400);
		this.control({
			'mainToolbar button[action=orgNew]': {
				click: this.newOrg
			},
			'orgWinTyres textfield[name=smart]': {
				change: this.filterMe
			},
			'orgWinTyres button[name=tmp1]': {
				click: function(){
					var store = this.getTyresStore();
					var f3 = { property: 'brand', value: 'Bridgestone' };
					// store.clearFilter();
					store.filter([f3]);
					var op = new Ext.data.Operation({
						action: 'read',
						filters: [ new Ext.util.Filter({ property: 'brand', value: 'GGG'}) ],
					});
					//store.load({ filters: [ 123123 ]});
					//store.load({ filters: new Ext.util.Filter({ property: 'brand', value: 'GGG'}) });
					//store.load(op);
					//store.getProxy().read(op);
				}
			}
		});
	},


	filterMe: function(){
		var t = this.getOrgWinTyres().down('textfield[name=smart]').getValue().split(/ /),
				store = this.getTyresStore(),
				info = this.getOrgWinTyres().down('tbtext[name=info]'),
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
			if(i){
				if(i[0].search(/\d/)>=0){
					// Размер
					rInt.forEach(function(r){
						i = i.replace(r[0],r[1]);
					});
					infoText+= ' Размер ' + i + ', ';
					filters.push({ property: 'hS', value: i });
					//filters.push({ property: 'posD', value:// 
					//filters.push([ 'hS', i ]);
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
						//filters.push({ property: 'brand', value: new RegExp(i,'i') });
						filters.push({ property: 'brand', value: i });
						SS = store;
					}
				}
			}
		});
		infoText = infoText.replace(/,\ $/,'');
		infoText = infoText.length ? 'Поиск: '+infoText : '';
		info.setText(infoText);

		S = store;
		// clearFilter() is sucks and reload db. Bitch. First reload, then suck.
		store.filters.items = [];
		store.filter(filters);

		/*
		var op = new Ext.data.Operation({
			action: 'read',
			filters: filters
		});
		store.getProxy().read(op);
		*/
		//store.load([{ start: 111 }]);
		/*
		filters.forEach(function(f){
			store.filter(f[0],f[1]);
		});
		*/

	},
	newOrg: function(btn){
		console.log('* Button :newOrg: was pressed', btn);
		var win = Ext.create('App.view.Org');
		win.show();
	}
});
