var express = require('express')
var app = module.exports = express()

var config = require('./config/env')

// set views for error and 404 pages
app.set('views', __dirname + '/views');

// serve static files
app.use(express.static(__dirname + '/public'));

// session support
app.use(express.cookieParser('some secret here'));
app.use(express.session());

// parse request bodies (req.body)
app.use(express.bodyParser());

// support _method (PUT in forms etc)
app.use(express.methodOverride());

require('./boot')(app, {})

if (!module.parent) {
  app.listen(config.server.port)
  console.log('Listening on port', config.server.port)
}
