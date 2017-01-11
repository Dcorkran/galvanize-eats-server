const knex = require('./knex');

module.exports = {
  getAllBooks: function(){
    return knex('book');
  }
};
