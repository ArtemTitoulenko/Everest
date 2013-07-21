var express = require('express')
var fs = require('fs')

var db = require('./db').getInstance()

module.exports = function (parent, opts) {
  fs.readdirSync(__dirname + '/../app/controllers').forEach(function (name) {
    opts.verbose && console.log('loading controller:', name)
    var controller = require(__dirname + '/../app/controllers/' + name)
    var initedController = new controller(db)
    var app = express()

    // set the views for the controller to be inside of the controller's folder
    app.set('views', __dirname + '/../app/controllers/' + name + '/views')

    console.log('there are', initedController.routes.length, 'routes for the', controller.name, 'controller')

    // set the routes that the controller exposes
    for (var i = 0; i < initedController.routes.length; i++) {
      var route = initedController.routes[i]
      console.log(route)
      app[route.method](route.path, initedController[route.action])
    }

    // attach this controller to the main server app
    parent.use(app)
  })
}
