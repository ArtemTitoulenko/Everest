var express = require('express')
var app = module.exports = express()

var env = process.env.MEDIUM_ENV || 'development'
var config = require('./config/env')[env]

app.use(express.logger())

// session support
app.use(express.cookieParser(config.server.cookie_secret))
app.use(express.session())

// parse request bodies (req.body)
app.use(express.bodyParser())

// support _method (PUT in forms etc)
app.use(express.methodOverride())

require('./lib/boot')(app, {})

// serve static files
app.use(express.static(__dirname + '/public'))

app.use('*', function (req, res, next) {
  res.send(404, '404')
})

// set views for error and 404 pages
app.set('views', __dirname + '/views')

if (!module.parent) {
  app.listen(config.server.port)
  console.log('Listening on port', config.server.port, 'in', env, 'mode')
}
