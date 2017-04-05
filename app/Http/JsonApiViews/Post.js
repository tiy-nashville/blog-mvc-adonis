const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Post extends JsonApiView {
  get attributes() {
    return ['title', 'content'];
  }

  comments() {
    return this.hasMany('App/Http/JsonApiViews/Comment', {
      included: true,
      excludeRelation: 'post'
    });
  }

}

module.exports = Post;
