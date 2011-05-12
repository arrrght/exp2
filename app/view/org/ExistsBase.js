// Техническая база
Ext.define('App.view.org.ExistsBase', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.existsBase',

	initComponent: function(){ Ext.apply(this, {
		//tbar: [{ xtype: 'button', text: 'Изменить', action: 'changeTechTyres' }],
		layout: { type: 'hbox', align: 'stretch' },
		items: [{
			flex: 1, border: false, title: 'Техника', xtype: 'existsBaseTech'
		},{
			xtype: 'splitter', performCollapse: false,
		},{
			flex: 1, border: false, title: 'Шины', xtype: 'existsBaseTyre'
		}]
	}); this.callParent(arguments) }

});

// Шины
Ext.define('App.view.org.ExistsBaseTyre', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.existsBaseTyre',
	store: { model: 'App.model.Tyre' },

	plugins: [
		Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			listeners: {
				validateedit: function(editor, e){
					e.record.set('count', this.editor.fuckedInt || e.value);
				}
			}
		})
	],

	initComponent: function(){
		Ext.apply(this, {

			invalidateScrollerOnRefresh: false,

			columns:  [
				{ header: 'Брэнд', dataIndex: 'brand', flex:1 },
				{ header: 'Размер', dataIndex: 'hS', flex:1 },
				{ header: 'Слойность', dataIndex: 'lay', flex:1 },
				{ header: 'Тип протектора', dataIndex: 'tra', flex:1 },
				{ header: 'Имя', dataIndex: 'name', flex:1 },
				{ header: 'Кол-во', dataIndex: 'count', flex:1,
					field: {
						xtype: 'spinnerfield',
						allowBlank: false,
						onChange: function(){
							// Kill me gently
							this.up().fuckedInt = this.getValue();
						},
						onSpinUp: function(){
							this.setValue((parseInt(this.getValue()) || 0) + 1);
						},
						onSpinDown: function(){
							this.setValue((parseInt(this.getValue()) || 2) - 1);
						}
					}
				},
			]

		}); this.callParent(arguments);
	}

});
// Техника
Ext.define('App.view.org.ExistsBaseTech', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.existsBaseTech',
	store: { model: 'App.model.Tech' },

	plugins: [
		Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			listeners: {
				validateedit: function(editor, e){
					e.record.set('count', this.editor.fuckedInt || e.value);
				}
			}
		})
	],

	initComponent: function(){
		Ext.apply(this, {

			selType: 'rowmodel',
			columns:  [
				{ header: 'Тип техники', dataIndex: 'typ', flex:2, },
				{ header: 'Брэнд', dataIndex: 'brand', flex:2,
					field: {
						xtype: 'textfield'
					}
				},
				{ header: 'Имя', dataIndex: 'name', flex:3,
					field: {
						xtype: 'textfield'
					}
				},
				{ header: 'Кол-во', dataIndex: 'count', flex:2,
					field: {
						xtype: 'spinnerfield',
						allowBlank: false,
						onChange: function(){
							// Kill me gently
							this.up().fuckedInt = this.getValue();
						},
						onSpinUp: function(){
							this.setValue((parseInt(this.getValue()) || 0) + 1);
						},
						onSpinDown: function(){
							this.setValue((parseInt(this.getValue()) || 2) - 1);
						}
					}
				},
			]

		}); this.callParent(arguments);
	}

});
