
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var error = require(process.cwd() + '/controllers/errorController');
var mysql = require(process.cwd() + '/mysql');

var app = express();
mysql.connect();

app.engine('html', require('ejs').renderFile);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(process.cwd() + '/public/favicon.ico'));

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use(express.cookieParser());

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(function(req, res, next){
	error.response(req, res, 404);
	
	return;
});


routes.configure(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
