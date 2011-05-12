var Schema = Mongoose.Schema,
		ObjectId = Schema.ObjectId,
		Query = Mongoose.Query,
		Rootdir;

// debug?
var util = require('util');

exports.init = function(rootdir, app){
	Rootdir = rootdir;
	//require(rootdir + '/srvapp/models/tyres.js');
	app.all('/srv/some', this.some);
	app.all('/srv/tech', this.tech);
	app.get('/app/model/*', this.model);
	return this;
}

// Ext4 'define' replacement
exports.define = function(className, data, nonUsed){
	this[className] = data;
	this['src*'+className] = 'Ext.define(\'' + className + '\',\n' + rec(data, 0) + '\n);';
}

// Ext4 Controller TODO

// Ext4 Model
exports.model = function(req, res, next){
	var modelName = req.url.slice(req.url.lastIndexOf('/'), req.url.lastIndexOf('.')).replace(/\W/g,''),
	    className = 'App.model.' + modelName;

	if(!Ext[className]){

		function cnvType(n,t){
			if (t == 'string'){
				return String
			}else if(t == 'float'){
				return Number
			}
			return 'unknown';
		}

		console.log('* Parse\'n\'apply model ' + className);
		require(Rootdir + '/app/model/'+ modelName + '.js');

		var modelFields = Ext[className].fields,
		    mngFields = {};

		modelFields.forEach(function(field){
			if (field.name != '_id'){
				mngFields[field.name] = cnvType(field.name, field.type);
			}
		});
		//console.log('* mngFields:', mngFields);
		Mongoose.model(modelName, new Schema(mngFields));

	}
	// Model out
	res.writeHead(200, { 'Content-type': 'text/javascript' });
	res.end(Ext['src*' + className]);
}

exports.tech = function(req, res, next){
	var filters = recodePara(req.query.filter);
	console.log('Filters on tech:\n', util.inspect(filters));

	var Tech = Mongoose.model('Tech');
	// 4DEBUG
	new Tech({brand: 'asdasd' }).save();
	Tech.find( filters, {}, { limit: 50 }, function(err, docs){
		// console.log('* ERR:', err);
		var body = JSON.stringify(docs);
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(body)
		});
		res.end(body);
	});
};

function recodePara(prm){
	var ret = {};

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

	if (prm){
		// TODO: TRY it
		// console.log('Plain:', prm);
		JSON.parse(prm).forEach(function(p){
			ret[p.property] = ret[p.property] ? ret[p.property] : [];
			ret[p.property].push(p.value);
		});

		// console.log('Rearray:', ret);
		var r = {};
		
		for (var key in ret){
			if (ret[key].length>1){
				var tt = [];
				ret[key].forEach(function(val){
					var res = fun(key, val);
					//tt.push(fun(key, val));
					tt.push(res.val);
					r[res.key] = { $in: tt };
					// r[key] = { $in: tt };
				});
			}else{
				var res = fun(key, ret[key][0]);
				r[res.key] = res.val;
				// r[key] = fun(key, ret[key][0]);
			}
		}
		return r;
	}else{ return {} };
};
exports.some = function(req, res, next){
	var filters = recodePara(req.query.filter);
	
	console.log('Filters:\n', util.inspect(filters));
	var Tyre = Mongoose.model('Tyre');

	Tyre.find( filters, {}, { limit: 50 }, function(err, docs){
		// console.log('* ERR:', err);
		var body = JSON.stringify(docs);
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(body)
		});
		res.end(body);
	});
}

// Non-exports functions
function isArray(ar) {
	return ar instanceof Array ||
				 Array.isArray(ar) ||
				 (ar && ar !== Object.prototype && isArray(ar.__proto__));
}

function isDate(d) {
	if (d instanceof Date) return true;
	if (typeof d !== 'object') return false;
	var properties = Date.prototype && Object.getOwnPropertyNames(Date.prototype);
	var proto = d.__proto__ && Object.getOwnPropertyNames(d.__proto__);
	return JSON.stringify(proto) === JSON.stringify(properties);
}

function rec(obj, spc){
	if(obj == null){
		return 'null';
	}else if(typeof(obj) == 'string'){
		return '"' + obj + '"';
	}else if(isDate(obj)){
		return '"' + obj.toString() + '"';
	}else if(typeof(obj) === 'object'){
		var braces = isArray(obj) ? ['[',']'] : ['{','}'];
		var ret = braces[0];
		for(var i in obj){
			if (isArray(obj)){
				ret += rec(obj[i], spc) + ', ';
			}else{
				ret += i + ': ' + rec(obj[i], spc) + ', ';
			}
		}
		ret = ret.slice(0, -2);
		return ret + braces[1];
	}else{
		return obj;
	}
}
