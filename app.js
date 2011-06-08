/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer(),
    mongoStore = require('connect-mongodb'),
		dbName = 'foo';


// Global
Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/' + dbName);
// _ conflicts with node REPL
__ = require('underscore');
__.mixin(require('underscore.string'));

// Configuration
app.configure(function(){
  app.use(express.logger({ format: '\x1b[32m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }))
  app.set('views', __dirname + '/app');
  app.set('view engine', 'ejs');
  app.set('view engine', 'jade');

	app.register('.js', require('ejs'));
	app.register('.html', require('ejs'));

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here', store: mongoStore({ dbname: dbName }) }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
	app.use(express.compiler({ src: __dirname + '/public', enable: [ 'less' ] }));

	app.set('view options', { layout: false });
});

// Use h2e4
require(__dirname + '/lib/h2e4.js').init(app);

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
/*
app.get('/app/*', function(req, res){
	res.header('Content-type', 'text/javascript');
	res.partial(__dirname + req.url);
});
*/

/*
app.get('/', function(req, res){
  res.render('Application.html');
});
*/

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
