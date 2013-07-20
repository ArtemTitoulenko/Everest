module.exports = {
  routes: [
    {method: 'get', path: '/:name', action: 'helloName'},
    {method: 'get', path: /^\/$/, action: 'hello'}
  ],

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