var fs = require('fs')
var v = require('valentine')

var env = process.env.MEDIUM_ENV || 'development'
var config = require('../config/env')[env]

var monk = require('monk')
var redis_module = require('redis')

// singleton
module.exports = (function () {
  var mongo
  var redis, _redis
  var models

  return {
    getInstance: function () {
      if (!mongo) mongo = monk(config.mongo.host + '/' + config.mongo.db)
      if (!redis || !_redis) { (_redis = redis_module) && (redis = redis_module.createClient()) }
      if (!models) {
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
      }

      return {
        mongo: mongo,
        redis: redis,
        _redis: _redis,
        models: models
      }
    }
  }
})()
