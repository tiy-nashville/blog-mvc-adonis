'use strict';

const Schema = use('Schema');

class CommentSchema extends Schema {

  up() {
    this.create('comments', (table) => {
      table.increments();
      table.string('username');
      table.text('content');
      table.integer('post_id').references('posts.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('comments');
  }

}

module.exports = CommentSchema;
