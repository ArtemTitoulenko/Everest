var monk = require('monk')
var redis = require('redis')

module.exports = function (parent, config) {
  this.mongo = monk(config.mongo.host + '/' + config.mongo.db)

  this._redis = redis // for raw redis access
  this.redis = redis.createClient()

  this.models = fs.readdirSync(__dirname + '../app/models').map(function (name) {
    opts.verbose && console.log('loading model:', name)
    return require(__dirname + '../app/models/' + name)
  })
}
