
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book_author',function(table){
    table.increments();
    table.integer('author_id').references("author.id").unsigned().onDelete('CASCADE');
    table.integer('book_id').references("book.id").unsigned().onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('book_author');
};
