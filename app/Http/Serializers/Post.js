const BaseSerializer = require('./BaseSerializer');

module.exports = class Post extends BaseSerializer {
  getAttributes(post) {
    return {
      title: post.title,
      content: post.content,
    };
  }

  get relationshipUrls() {
    return {
      comments: '/posts/:id/comments',
    };
  }
};
