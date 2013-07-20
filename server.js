var express = require('express')
var app = module.exports = express()

var env = process.env['ENV'] || 'development'
var config = require('./config/env')[env]

var db = require('monk')(config.mongo.host + '/' + config.mongo.db)

// middleware which passes a reference to the db in the request object
// there's probably a better way to do this
app.use(function (req, res, next) {
  req.db = db
  next()
})

var redis = require('redis')
var redisClient = redis.createClient()
app.use(function (req, res, next) {
  req._redis = redis // for raw redis access
  req.redis = redisClient
  next()
})

// set views for error and 404 pages
app.set('views', __dirname + '/views');

// serve static files
app.use(express.static(__dirname + '/public'));

// session support
app.use(express.cookieParser(config.server.cookie_secret));
app.use(express.session());

// parse request bodies (req.body)
app.use(express.bodyParser());

// support _method (PUT in forms etc)
app.use(express.methodOverride());

require('./boot')(app, {})

if (!module.parent) {
  app.listen(config.server.port)
  console.log('Listening on port', config.server.port, 'in', env, 'mode')
}
