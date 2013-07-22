// fuck this shit
// mongodb things are schema-less. so why bother writing a schema??! :wq yolo
// validation, is what we really want

var schema = require('js-schema')

function Post(data) {
  var valid = schema({
    title: String,
    authorId: Number,
    body: String // should be Array.of(Paragraph), but not yet
  })(data)

  if (valid) for (var key in data) this[key] = data[key]
  else throw new Error('Not a valid Post')
}

Post.fromJson = function(data) {
  return new Post(data)
}

module.exports = Post

/* testing
var p = new Post({title: 'foo', authorId: 123, body: 'bar'})
console.log(p)

p = Post.fromJson({title: 'foo', authorId: 123, body: 'bar'})
console.log(p)
*/
