function ApplicationController(db) {
  this.db = db
}

ApplicationController.ROUTES = [
  {method: 'get', path: '/', action: 'index'},
  {method: 'get', path: '/hello', action: 'hello'},
  {method: 'get', path: '/hello/:name', action: 'helloName'}
]

ApplicationController.prototype.index = function (req, res) {
  console.log(this.db)
  res.send('home page')
}

ApplicationController.prototype.hello = function (req, res) {
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
