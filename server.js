var express = require('express')
var app = module.exports = express()

var env = process.env.MEDIUM_ENV || 'development'
var config = require('./config/env')[env]

app.use(express.logger())

// middleware which passes a reference to the db in the request object
// there's probably a better way to do this
var db = require('monk')(config.mongo.host + '/' + config.mongo.db)
app.use(function (req, res, next) {
  req.db = db
  next()
})

// middleware that injects a reference to the redis client
var redis = require('redis')
var redisClient = redis.createClient()
app.use(function (req, res, next) {
  req._redis = redis // for raw redis access
  req.redis = redisClient
  next()
})

// set views for error and 404 pages
app.set('views', __dirname + '/views');

// session support
app.use(express.cookieParser(config.server.cookie_secret));
app.use(express.session());

// parse request bodies (req.body)
app.use(express.bodyParser());

// support _method (PUT in forms etc)
app.use(express.methodOverride());

require('./boot')(app, {})

// serve static files
app.use(express.static(__dirname + '/public'))

app.use('*', function (req, res, next) {
  res.send(404, '404')
})

if (!module.parent) {
  app.listen(config.server.port)
  console.log('Listening on port', config.server.port, 'in', env, 'mode')
}
