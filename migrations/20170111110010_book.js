
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author',function(table){
    table.increments();
    table.string('First Name').notNullable();
    table.string('Last Name').notNullable();
    table.text('Biography').notNullable();
    table.text('Portrait URL').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('author');
};
