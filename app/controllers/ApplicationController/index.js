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

  this.routes = [
    {method: 'get', path: '/', action: this.index},
    {method: 'get', path: '/hello', action: this.hello},
    {method: 'get', path: '/hello/:name', action: this.helloName}
  ]
}

module.exports = ApplicationController
