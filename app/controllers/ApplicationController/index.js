module.exports = {
  routes: [
    {method: 'get', path: '/', action: 'index'},
    {method: 'get', path: '/hello', action: 'hello'},
    {method: 'get', path: '/hello/:name', action: 'helloName'}
  ],

  index: function (req, res) {
    res.send('home page')
  },

  hello: function(req, res) {
    req.redis.incr('hello', function (err, obj) {
      console.log('hello:', obj)
    })
    res.send('hello world')
  },

  helloName: function(req, res) {
    req.redis.incr('helloName', function (err, obj) {
      console.log('helloName:', obj)
    })
    res.send('hello ' + req.params.name)
  }
}
