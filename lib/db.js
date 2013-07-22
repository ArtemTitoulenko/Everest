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
  schemas: (function () {
    schemas = {}
    fs.readdirSync(__dirname + '/../app/schemas').map(function (name) {
      var included_schemas = require(__dirname + '/../app/schemas/' + name)

      // module.exports = [function Post() {}, function Bar() {}]
      if (v.is.array(included_schemas)) {
        for (var i = 0, schema; schema = included_schemas[i], i < included_schemas.length; i++) {
          schemas[schema.name] = schema
        }
      // module.exports = {Post: function Post(){}, Bar: function Bar(){}}
      } else if (v.is.obj(included_schemas)) {
        for (var key in included_schemas) {
          schemas[key] = included_schemas[key]
        }
      // module.exports = function Post(){}
      } else if (v.is.fun(included_schemas)) {
        schemas[included_schemas.name] = included_schemas
      }
    })
    return schemas
  })()
}
