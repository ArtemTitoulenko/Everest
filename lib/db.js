var fs = require('fs')

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
          console.log('loading model:', name)
          models[name[0].toUpperCase() + name.slice(1,name.length - 3)] = require(__dirname + '/../app/models/' + name)
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
