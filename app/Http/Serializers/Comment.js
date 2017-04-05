const BaseSerializer = require('./BaseSerializer');

module.exports = class Comment extends BaseSerializer {
  getAttributes(comment) {
    return {
      username: comment.username,
      content: comment.content,
    };
  }

  get relationshipUrls() {
    return {
      post: '/comments/:id/post',
    };
  }
};
