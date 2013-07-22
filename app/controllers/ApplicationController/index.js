function ApplicationController(db) {
  this.index = function (req, res) {
    res.send('home page')
  }

  this.hello = function (req, res) {
    db.redis.incr('hello', function (err, obj) {
      console.log('hello:', obj)
    })
    res.send('hello world')
  }

  this.helloName = function (req, res) {
    db.redis.incr('helloName', function (err, obj) {
      console.log('helloName:', obj)
    })
    res.send('hello ' + req.params.name)
  }
}

ApplicationController.ROUTES = [
  {method: 'get', path: '/', action: 'index'},
  {method: 'get', path: '/hello', action: 'hello'},
  {method: 'get', path: '/hello/:name', action: 'helloName'}
]


module.exports = ApplicationController
