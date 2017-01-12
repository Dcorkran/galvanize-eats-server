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
      return knex.raw(`INSERT INTO book_author (author_id,book_id) SELECT id,${id[0]} FROM author WHERE "First Name" = '${book.authorName}';`);
    });
  }
};
