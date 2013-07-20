var express = require('express')
var fs = require('fs')

module.exports = function (parent, opts) {
  fs.readdirSync(__dirname + '/app/controllers').forEach(function (name) {
    opts.verbose && console.log('loading controller:', name)
    var controller = require(__dirname + '/app/controllers/' + name)
    var app = express()

    // set the views for the controller to be inside of the controller's folder
    app.set('views', __dirname + '/app/controllers/' + name + '/views')

    // set the routes that the controller exposes
    for (var i = 0; i < controller.routes.length; i++) {
      var route = controller.routes[i]
      console.log(route)
      app[route.method](route.path, controller[route.action])
    }

    // attach this controller to the main server app
    parent.use(app)
  })

  var models = fs.readdirSync(__dirname + '/app/models').map(function (name) {
    opts.verbose && console.log('loading model:', name)
    return require(__dirname + '/app/models/' + name)
  })

  // middleware that injects all of the models into a request object
  parent.use(function (req, res, next) {
    req.models = models
    next()
  })
}