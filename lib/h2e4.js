var util = require('util');
var Schema = Mongoose.Schema,
		ObjectId = Schema.ObjectId,
		Query = Mongoose.Query;

module.exports = {
	init: function(rootdir, app){
		require(rootdir + '/srvapp/models/tyres.js');
		app.all('/srv/some', this.some);
	},

	some: function(req, res, next){

		function makeHash(key, val){
			var t = {};
			t[key] = val;
			return t;
		}
		function recodePara(prm){
			var ret = {};

			var fun = function(key, val){
				var rE = function(v){ return new RegExp(v,'i') };
				var	plain = function(v){ return v };
				var f = { tra: rE, brand: rE };
				return typeof(f[key])==='undefined' ? val : f[key](val);
			};

			if (prm){
				// TODO: TRY it
				console.log('Plain:', prm);
				JSON.parse(prm).forEach(function(p){
					ret[p.property] = ret[p.property] ? ret[p.property] : [];
					ret[p.property].push(p.value);
				});

				console.log('Rearray:', ret);
				var r = {};
				
				for (var key in ret){
					if (ret[key].length>1){
						var tt = [];
						ret[key].forEach(function(val){
							tt.push(fun(key, val));
							r[key] = { $in: tt };
						});
					}else{
						r[key] = fun(key, ret[key][0]);
					}
				}
				return r;
			}else{ return {} };
		};

		var filters = {};
		//console.log('* query' + req.query.filter);
		var qFilters = req.query.filter;
		filters = recodePara(req.query.filter);
		
		console.log('Filters:\n', util.inspect(filters));
		var Tyres = Mongoose.model('Tyres');
		//new Tyres({ name: 'asdasd' }).save();
		//filters = new Query({ tra: new RegExp('L2') });
		//filters = { tra: { $regex: 'L5' }};

		Tyres.find( filters, {}, { limit: 50 }, function(err, docs){
		//Tyres.find({}, {}, function(err, docs){
			console.log('* ERR:', err);
			var body = JSON.stringify(docs);
			res.writeHead(200, {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(body)
			});
			res.end(body);
		});
	}
};
