const knex = require('./knex');

module.exports = {
  getAuthors: function(){
    return knex('author')
  }
};
