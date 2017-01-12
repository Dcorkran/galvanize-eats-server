const knex = require('./knex');

module.exports = {
  getAuthors: function(){
    return knex('author')
  },
  postAuthor: function(author){
    return knex('author')
    .insert({
      'First Name':author.fname,
      'Last Name':author.lname,
      'Portrait URL':author.img,
      'Biography':author.bio,
    })
    .returning('id')
    .then((id)=>{
      // for multiple authors we will need to loop through an author array
      // use i for the lname later
      if (typeof author.books === 'object') {
        let promises = author.books.title.map((book,i)=>{
          return knex.raw(`INSERT INTO book_author (author_id,book_id) SELECT ${id[0]},id FROM book WHERE "Book Title" = '${book}';`);
        });
        return Promise.all(promises).then(()=>{
          return 'Book Added';
        });
      } else {
        return knex.raw(`INSERT INTO book_author (author_id,book_id) SELECT ${id[0]},id FROM book WHERE "Book Title" = '${author.books}';`);
      }

    });
  },
  deleteAuthor: function(id){
    return knex('author')
    .where('id',id)
    .del()
    .returning('id')
    .then((id)=>{
      return knex('book_author')
      .where('author_id',id[0])
      .del();
    });
  }
};
