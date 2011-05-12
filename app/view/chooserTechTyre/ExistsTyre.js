Ext.define('App.view.chooserTechTyre.ExistsTyre', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.existsTyre',
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
						xtype: 'spinnerfield', allowBlank: false,
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
