var express = require('express')
var app = express()

var config = require('./config/env')

app.get('/', function (req, res) {
  res.write('hello world')
})

app.listen(config.server.port)
console.log('Listening on port', config.server.port)
