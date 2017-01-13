const knex = require('./knex');

module.exports = {
  getAuthors: function(){
    return knex('author')
    .then((authors)=>{
      let promises = authors.map((author)=>{
        author.book=[];
        return this.getBooksByAuthor(author.id).then((book)=>{
          for (var i = 0; i < book.length; i++) {
            author.book[i] = book[i];
          }
        });
      });
      return Promise.all(promises).then(() => {
        return authors;
      });
    });
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
  },
  getOneAuthor: function(id){
    return knex('author')
    .where('id',id)
    .then((authors)=>{
      let promises = authors.map((author)=>{
        author.book=[];
        return this.getBooksByAuthor(author.id).then((book)=>{
          for (var i = 0; i < book.length; i++) {
            author.book[i] = book[i];
          }
        });
      });
      return Promise.all(promises).then(() => {
        return authors;
      });
    });
  },
  updateAuthor: function(id,body){
    return knex('author')
    .where('author.id',id)
    .update({
      'First Name':body.fname,
      'Last Name':body.lname,
      'Biography': body.bio,
      'Portrait URL':body.img
    });
  },
  getAuthorsByBook: function(bookID){
    return knex('author')
    .innerJoin('book_author','author.id','book_author.author_id')
    .where('book_author.book_id',bookID);
  },
  getBooksByAuthor: function(authorID){
    console.log(authorID);
    return knex('book')
    .innerJoin('book_author','book.id','book_author.book_id')
    .where('book_author.author_id',authorID);
  }
};
