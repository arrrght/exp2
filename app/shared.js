var lastFilterTypeVal;

function filterTyre() {
	var t = this.getCpTyre().down('textfield[name=smart]').getValue().split(/ /),
			store = this.getTyresStore(),
			info = this.getCpTyre().down('tbtext[name=info]'),
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
	if (infoText != lastFilterTypeVal){
		store.filters.items = [];
		store.filter(filters);
	}

	lastFilterTypeVal = infoText;
}
