const knex = require('./knex');
var authorQueries = require('./authorQueries');

module.exports = {
  getAllBooks: function(){
    return knex('book')
    .then((books)=>{
      let promises = books.map((book)=>{
        book.author=[];
        return authorQueries.getAuthorsByBook(book.id).then((author)=>{
          for (var i = 0; i < author.length; i++) {
            book.author[i] = author[i];
          }
        });
      });
      return Promise.all(promises).then(() => {
        return books;
      });
    });
  },
  postBook: function(book){
    return knex('book')
    .insert({
      'Book Title':book.title,
      'Book Genre':book.genre,
      'Book Cover URL':book.img,
      'Book Description':book.description,
    })
    .returning('id')
    .then((id)=>{
      // for multiple authors we will need to loop through an author array
      // use i for the lname later
      if (typeof book.authors === 'object') {
        let promises = book.authors.firstName.map((author,i)=>{
          return knex.raw(`INSERT INTO book_author (author_id,book_id) SELECT id,${id[0]} FROM author WHERE "First Name" = '${author}';`);
        });
        return Promise.all(promises).then(()=>{
          return 'Book Added';
        });
      } else {
        return knex.raw(`INSERT INTO book_author (author_id,book_id) SELECT id,${id[0]} FROM author WHERE "First Name" = '${book.authors.firstName[0]}';`);
      }

    });
  },
  deleteBook: function(id){
    return knex('book')
    .where('id',id)
    .del()
    .returning('id')
    .then((id)=>{
      return knex('book_author')
      .where('book_id',id[0])
      .del();
    });
  },
  getOneBook: function(id){
    return knex('book')
    .where('id',id)
    .then((books)=>{
      let promises = books.map((book)=>{
        book.author=[];
        return authorQueries.getAuthorsByBook(book.id).then((author)=>{
          for (var i = 0; i < author.length; i++) {
            book.author[i] = author[i];
          }
        });
      });
      return Promise.all(promises).then(() => {
        return books;
      });
    });
  },
  updateBook: function(id,body){
    return knex('book')
    .where('book.id',id)
    .update({
      'Book Title':body.title,
      'Book Genre':body.genre,
      'Book Description': body.description,
      'Book Cover URL':body.img
    });
  }
};
