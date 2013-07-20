function ApplicationController() {
  routes: [
    {action: 'GET', route: '*', action: hello}
  ],

  hello: function (req, res) {
    res.send('hello world')
  }
}

module.exports = ApplicationController
