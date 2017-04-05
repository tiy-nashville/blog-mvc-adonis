'use strict';

const Comment = use('App/Model/Comment');
const attributes = ['username', 'content'];

const RootSerializer  = require('../Serializers/RootSerializer');
const CommentSerializer = require('../Serializers/Comment');

class CommentController {

  constructor() {
    this.rootSerializer = new RootSerializer();
    this.commentSerializer = new CommentSerializer();
  }

  * index(request, response) {
    const comments = yield Comment.with('post').fetch();

    response.json(this.rootSerializer.serializeMany(request.url(), comments, this.commentSerializer));
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      post_id: request.jsonApi.getRelationId('post'),
    };
    const comment = yield Comment.create(Object.assign({}, input, foreignKeys));

    response.json(this.rootSerializer.serializeOne(request.url(), comment, this.commentSerializer));
  }

  * show(request, response) {
    const id = request.param('id');
    const comment = yield Comment.with('post').where({ id }).firstOrFail();

    response.json(this.rootSerializer.serializeOne(request.url(), comment, this.commentSerializer));
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      post_id: request.jsonApi.getRelationId('post'),
    };

    const comment = yield Comment.with('post').where({ id }).firstOrFail();
    comment.fill(Object.assign({}, input, foreignKeys));
    yield comment.save();

    response.json(this.rootSerializer.serializeOne(request.url(), comment, this.commentSerializer));
  }

  * destroy(request, response) {
    const id = request.param('id');

    const comment = yield Comment.query().where({ id }).firstOrFail();
    yield comment.delete();

    response.status(204).send();
  }

}

module.exports = CommentController;
