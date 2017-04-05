'use strict';

const Comment = use('App/Model/Comment');
const attributes = ['username', 'content'];

const RootSerializer  = require('../../Serializers/RootSerializer');
const CommentSerializer = require('../../Serializers/Comment');

class CommentController {

  constructor() {
    this.rootSerializer = new RootSerializer();
    this.commentSerializer = new CommentSerializer();
  }

  * index(request, response) {
    const postId = request.param('postId');
    const comments = yield Comment.with().where({ post_id: postId }).fetch();

    response.json(this.rootSerializer.serializeMany(request.url(), comments, this.commentSerializer));
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      post_id: request.param('postId'),
    };
    const comment = yield Comment.create(Object.assign({}, input, foreignKeys));

    response.json(this.rootSerializer.serializeMany(request.url(), comment, this.commentSerializer));
  }

}

module.exports = CommentController;
