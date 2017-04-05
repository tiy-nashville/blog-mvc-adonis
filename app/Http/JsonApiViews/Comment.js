const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Comment extends JsonApiView {
  get attributes() {
    return ['username', 'content'];
  }

  post() {
    return this.belongsTo('App/Http/JsonApiViews/Post', {
      included: true,
      excludeRelation: 'comments'
    });
  }

}

module.exports = Comment;
