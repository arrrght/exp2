// Checkout object is Array
Ext.decodeFilters = function(rawFilter){
//function decodeFilters(rawFilter){
	var fun = function(key, val){
		var rE = function(key, val){ return { key: key, val: new RegExp(val, 'i')}};
		var special = function(key, val){
			if (val.search(/[R-]/)>-1){
				return { key: 'sizeName', val: val }
			}else{
				return { key: key, val: val };
			}
		}
		var f = { tra: rE, brand: rE, name: rE, hS: special };
		return typeof(f[key])==='undefined' ? { key: key, val: val } : f[key](key, val);
	};
	
	if(rawFilter && __.isArray(rawFilter)){
		var rArr = {},
				r = {};

		// Rearray first
		rawFilter.forEach(function(f){
			rArr[f.property] = rArr[f.property] ? rArr[f.property] : [];
			rArr[f.property].push(f.value);
		});

		// Now process it
		for (var key in rArr){
			if (rArr[key].length>1){
				var tt = [];
				rArr[key].forEach(function(val){
					var res = fun(key, val);
					tt.push(res.val);
					r[res.key] = { $in: tt };
				});
			}else{
				var res = fun(key, rArr[key][0]);
				r[res.key] = res.val;
			}
		}
		return r;
	}else{
		return {}
	}
}
