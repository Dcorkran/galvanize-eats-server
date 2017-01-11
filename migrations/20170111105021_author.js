
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book',function(table){
    table.increments();
    table.string('Book Title').notNullable();
    table.string('Book Genre').notNullable();
    table.text('Book Description').notNullable();
    table.text('Book Cover URL').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('book');
};
