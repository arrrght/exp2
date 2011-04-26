module.exports = {
	init: function(rootdir, app){
		require(rootdir + '/srvapp/models/tyres.js');
		app.all('/srv/some', this.some);
	},

	some: function(req, res, next){
		var Tyres = Mongoose.model('Tyres');
		//new Tyres({ name: 'asdasd' }).save();

		Tyres.find({}, {}, { limit: 150 }, function(err, docs){
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
