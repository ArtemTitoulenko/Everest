var express = require('express')
var fs = require('fs')

module.exports = function (parent, opts) {
  fs.readdirSync(__dirname + '/app/controllers').forEach(function (name) {
    var controller = require(__dirname + '/app/controllers/' + name)
    var app = express()

    // set the views for the controller to be inside of the controller's folder
    app.set('views', __dirname + '/app/controllers/' + name + '/views')

    // set the routes that the controller exposes
    for (var i = 0; i < controller.routes.length; i++) {
      var route = controller.routes[i]
      app[route.method](route.path, controller[route.action])
    }

    // attach this controller to the main server app
    parent.use(app)
  })
}