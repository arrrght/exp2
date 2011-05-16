Ext.define('App.view.chooserTechTyre.ExistsTech', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.existsTech',
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
				{ header: 'Кол-во', dataIndex: 'count', xtype: 'numbercolumn', format: '0',  flex:2,
					editor: {
						xtype: 'numberfield', allowBlank: false, minValue: 1, maxValue: 150000,
						onChange: function(){
							// Kill me gently
							this.up().fuckedInt = this.getValue();
						},
					}
				},
			]

		}); this.callParent(arguments);
	}

});
