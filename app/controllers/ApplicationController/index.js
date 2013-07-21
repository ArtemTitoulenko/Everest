function ApplicationController(db) {
  this.db = db

  this.routes = [
    {method: 'get', path: '/', action: 'index'},
    {method: 'get', path: '/hello', action: 'hello'},
    {method: 'get', path: '/hello/:name', action: 'helloName'}
  ]

  return this
}

ApplicationController.prototype.index = function (req, res) {
  res.send('home page')
}

ApplicationController.prototype.hello = function (req, res) {
  console.log(this.db.mongo)
  this.db.redis.incr('hello', function (err, obj) {
    console.log('hello:', obj)
  })
  res.send('hello world')
}

ApplicationController.prototype.helloName = function (req, res) {
  this.db.redis.incr('helloName', function (err, obj) {
    console.log('helloName:', obj)
  })
  res.send('hello ' + req.params.name)
}

module.exports = ApplicationController
