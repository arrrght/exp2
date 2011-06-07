Ext.define('App.controller.Org', {
	extend: 'Ext.app.Controller',

	stores: [ 'Orgs', 'Ppls' ],
	models: [ 'Org', 'Ppl', 'Contact' ],

	requires: [ 
		'App.view.Org',
		'App.view.ChooserTechTyre',
		//'App.view.org.AddContact'
	],

	refs: [
		{ ref: 'orgWin', selector: 'orgWin' },
		{ ref: 'orgAddContact', selector: 'orgAddContact' },
	],

	init: function() {
		this.control({
			'orgWin button[action=changeTab]': { click: this.changeTab },
			'orgContacts': {
				itemcontextmenu: this.contextMenu,
				itemdblclick: this.changeContact
			},
			'orgAddContact button#addContact': { click: this.addContact },
			'orgAddContact button#save': { click: this.savePpl },
		});
	},

	savePpl: function(btn){
		var win = btn.up('window'),
		    send = {
					fio_fam: win.down('textfield[name=fio_fam]').getValue(),
					fio_nam: win.down('textfield[name=fio_nam]').getValue(),
					fio_oth: win.down('textfield[name=fio_oth]').getValue(),
					post: win.down('textfield[name=post]').getValue(),
					contacts: [],
					id: win.bindRec.data._id,
					orgName: win.bindRec.data.orgName,
					orgId: win.bindRec.data.orgId,
					orgOldId: win.bindRec.data.orgOldId,
				};
		win.down('gridpanel').getStore().data.items.forEach(function(x){
			send.contacts.push({ cntType: x.data.cntType, cnt: x.data.cnt });
		});
		Org.tst01(send, {
			success: function(ret, action){
				console.log('SUCC', ret, action);
			},
			failure: function(ret, action){
				console.log('FAIL');
			}
		});
		//console.log('send', send);

	},

	addContact: function(btn){
		var grid = btn.up('gridpanel'),
				rowEdit = grid.getPlugin(),
				r = Ext.ModelManager.create({ cntType: 'Рабочий телефон', cnt: '' }, 'App.model.Contact');

		rowEdit.cancelEdit();
		grid.getStore().insert(0, r);
		rowEdit.startEdit(0,0);
		grid.doLayout();
	},

	changeContact: function(view, record, item, index, e){
		var win = Ext.create('App.view.org.AddContact');
		win.bindRec = record;
		win.down('textfield[name=fio_fam]').setValue(record.data.fio_fam);
		win.down('textfield[name=fio_nam]').setValue(record.data.fio_nam);
		win.down('textfield[name=fio_oth]').setValue(record.data.fio_oth);
		win.down('textfield[name=post]').setValue(record.data.post);
		var g = win.down('gridpanel').getStore();
		g.removeAll();
		record.data.contacts.forEach(function(c){
			g.add({ cntType: c.type, cnt: c.content });
		});
		win.show();
	},

	contextMenu: function(view, record, item, index, e){
		var that = this;
		e.stopEvent();
		Ext.create('Ext.menu.Menu',{
			items: [{
				text: 'Коммерческое предложение', handler: function(){
					var cp = Ext.create('App.view.Cp');
					cp.down('fieldset[name=pplSet] textfield[name=fio]').setValue(record.data.fio);
					cp.down('fieldset[name=pplSet] textfield[name=post]').setValue(record.data.post);
					cp.show();
				}
			}]
		}).showAt(e.getXY());
	},

	emptyFun: function(){
		console.log('* emptyFun');
	},

	orgAddContact: function(){
		var win = Ext.create('App.view.org.AddContact');
		win.show();
	},

	orgEditBaseTechTyre: function(){
		Ext.create('App.view.ChooserTechTyre').show();
	},

	changeTab: function(){
		var funs = {
			info: this.emptyFun,
			contacts: this.orgAddContact,
			contracts: this.emptyFun,
			sales: this.emptyFun,
			techBase: this.orgEditBaseTechTyre,
			reports: this.emptyFun,
			nonExists: this.emptyFun
		};
		funs[this.getOrgWin().down('tabpanel').activeTab.tabName || 'nonExist'].apply(this);
	},

});

Ext.endpoint('tst01', function(para){
	if(para.data && __.isArray(para.data)){
		var ret = this,
		    prm = para.data.shift(),
		    Ppl = Mongoose.model('Ppl');
		Ppl.findById( prm.id, function(err, ppl){
			if(ppl){
				delete(prm.id);
				__.extend(ppl, prm);
				ppl.save(function(err){
					if(!err){
						ret.success(ppl);
					}
				});
			}
		});

	}else{
		this.failure('WTF with data?');
	}
});
