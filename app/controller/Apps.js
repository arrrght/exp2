GLB = 1;
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
		this.control({
			'mainToolbar button[action=orgNew]': {
				click: this.newOrg
			},
			'orgWinTyres textfield[name=smart]': {
				change: this.filterMe
			},
			'orgWinTyres button[action=tst1]': {
				click: function(btn){
					var store = this.getTyresStore();
					//var grid = this.getOrgTyresView();

					STORE = store; // DEBUG
					store.filter('d','14');
					
				}
			},
			'orgWinTyres button[action=tst2]': {
				click: function(btn){
					var store = this.getTyresStore();
					//var grid = this.getOrgTyresView();

					store.clearFilter();
					
				}
			}
		});
	},


	// TODO create buffered
	filterMe: function(tf, txt){
		//Ext.Function.createBuffered(this.filterMeBuf, 10);
		AAA = Ext.Function.createBuffered(function(){
			console.log('***');
		}, 1000);
		AAA();
	},

	filterMeBuf: function(tf, txt){
		var store = this.getTyresStore();
		//var lab = grid.up();
		//var grid = this.getOrgTyresView();
		//grid.enable();
		var info = this.getOrgWinTyres().down('tbtext[name=info]');

		var t = txt.split(/ /);
		var rInt = [
			[ /00/, '.00' ], [ 'ю', '.' ], [ '..', '.' ], [ 'р', 'R' ], [ 'r', 'R' ], [ 'к', 'R' ]
		];
		var rStr = [
			[ /br.+/, 'Bridgestone' ], [ /бр.+/, 'Bridgestone' ], [ /гу.+/, 'GoodYear' ],[ /go.+/, 'GoodYear' ], 
			[ /ми.+/, 'Michelin'], [ /mi.+/, 'Michelin'], [/фа.+/, 'Firestone'], [/fi.+/, 'Firestone']
		];
		var infoText = '';
		var filters = [];
		t.forEach(function(i){
			if(i){
				if(i[0].search(/\d/)>=0){
					rInt.forEach(function(r){
						i = i.replace(r[0],r[1]);
					});
					infoText+= ' Размер ' + i + ', ';
					filters.push([ 'hS', i ]);
				}else{
					if (i[0].search(/[LET]/i)>=0){
						if(i.length>1){
							filters.push([ 'tra', i]);
							infoText+= ' TRA ' + i + ', ';
						}
					}else{
						rStr.forEach(function(r){
							i = i.replace(r[0],r[1]);
						});
						infoText+= ' Брэнд ' + i + ', ';
						filters.push([ 'brand', i ]);
					}
				}
			}
		});
		info.setText(infoText+ 'cnt: ' + GLB++);

		store.clearFilter();
		filters.forEach(function(f){
			//infoText += ' ' + f[0]=='hS'? 'Размер' : 'Брэнд' + 
			store.filter(f[0],f[1]);
		});

		//store.clearFilter(true);
		//store.filter('hS', txt);
	},
	newOrg: function(btn){
		console.log('* Button :newOrg: was pressed', btn);
		var win = Ext.create('App.view.Org');
		win.show();
	}
});
