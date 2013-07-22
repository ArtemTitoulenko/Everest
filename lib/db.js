var fs = require('fs')
var v = require('valentine')

var env = process.env.MEDIUM_ENV || 'development'
var config = require('../config/env')[env]

var monk = require('monk')
var redis_module = require('redis')

module.exports = {
  mongo: monk(config.mongo.host + '/' + config.mongo.db),
  redis: redis_module.createClient(),
  _redis: redis_module,
  models: (function () {
    models = {}
    fs.readdirSync(__dirname + '/../app/models').map(function (name) {
      var included_models = require(__dirname + '/../app/models/' + name)

      // module.exports = [function Post() {}, function Bar() {}]
      if (v.is.array(included_models)) {
        for (var i = 0, model; model = included_models[i], i < included_models.length; i++) {
          models[model.name] = model
        }
      // module.exports = {Post: function Post(){}, Bar: function Bar(){}}
      } else if (v.is.obj(included_models)) {
        for (var key in included_models) {
          models[key] = included_models[key]
        }
      // module.exports = function Post(){}
      } else if (v.is.fun(included_models)) {
        models[included_models.name] = included_models
      }
    })
  })()
}
