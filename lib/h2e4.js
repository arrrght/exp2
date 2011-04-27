var util = require('util');

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

			// prm: { brand: [ '1', '2' ], tS: [ 'asd' ] }
			// ret: { $or : [ { brand : {$regex: '^Nok' } } , { brand : {$regex: '^Gen' } } ] }

			if (prm){
				// TODO: try it
				console.log(prm);
				JSON.parse(prm).forEach(function(p){
					ret[p.property] = ret[p.property] ? ret[p.property] : [];
					ret[p.property].push(p.value);
				});

				console.log('Rearray', ret);
				var r = {};
				
				for (var key in ret){
					if (ret[key].length>1){
						r['$or'] = [];
						ret[key].forEach(function(v){
							//r['$or'].push(makeHash(key, makeHash('$regex', '"^'+v+'"')));
							r['$or'].push(makeHash(key, v));
						});
					}else{
					}
					console.log(util.inspect(r));
					return r;
				}
			}else{ return {} };
		};

		var filters = {};
		//console.log('* query' + req.query.filter);
		var qFilters = req.query.filter;
		filters = recodePara(req.query.filter);

		var Tyres = Mongoose.model('Tyres');
		//new Tyres({ name: 'asdasd' }).save();

		Tyres.find( filters, {}, { limit: 50 }, function(err, docs){
		//Tyres.find({}, {}, function(err, docs){
			var body = JSON.stringify(docs);
			res.writeHead(200, {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(body)
			});
			res.end(body);
		});
	}
};
