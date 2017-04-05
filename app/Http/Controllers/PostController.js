'use strict';

const Post = use('App/Model/Post');
const attributes = ['title', 'content'];

const RootSerializer  = require('../Serializers/RootSerializer');
const PostSerializer = require('../Serializers/Post');

class PostController {

  constructor() {
    this.rootSerializer = new RootSerializer();
    this.postSerializer = new PostSerializer();
  }

  * index(request, response) {
    const posts = yield Post.with().fetch();

    response.json(this.rootSerializer.serializeMany('/posts', posts, this.postSerializer));
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const post = yield Post.create(Object.assign({}, input, foreignKeys));

    response.json(this.rootSerializer.serializeOne('/posts', post, this.postSerializer));
  }

  * show(request, response) {
    const id = request.param('id');
    const post = yield Post.with().where({ id }).firstOrFail();

    response.json(this.rootSerializer.serializeOne('/posts', post, this.postSerializer));
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const post = yield Post.with().where({ id }).firstOrFail();
    post.fill(Object.assign({}, input, foreignKeys));
    yield post.save();

    response.json(this.rootSerializer.serializeOne('/posts', post, this.postSerializer));
  }

  * destroy(request, response) {
    const id = request.param('id');

    const post = yield Post.query().where({ id }).firstOrFail();
    yield post.delete();

    response.status(204).send();
  }

}

module.exports = PostController;
