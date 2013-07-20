function ApplicationController() {
  this.routes = [
    {method: 'get', path: '/', action: 'hello'},
    {method: 'get', path: '/:name', action: 'hello'}
  ]
}

ApplicationController.prototype.hello = function(req, res) {
  if (req.params.name) res.send('hello ' + req.params.name)
  else res.send('hello world')
}

module.exports = new ApplicationController()