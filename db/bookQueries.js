const knex = require('./knex');

module.exports = {
  getAllBooks: function(){
    return knex('book');
  },
  postBook: function(book){
    console.log('hitting2',book);
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
      .where('id',id)
      .del();
    });
  },
  getOneBook: function(id){
    return knex('book')
    .innerJoin('book_author','book.id','book_author.id')
    .innerJoin('author','book_author.id','author.id')
    .where('book.id',id);
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
