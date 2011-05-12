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
