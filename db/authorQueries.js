const knex = require('./knex');

module.exports = {
  getAuthors: function(){
    return knex('author')
  },
  postAuthor: function(author){
    console.log('hitting2',author);
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
        console.log('many',author.books);
        let promises = author.books.title.map((book,i)=>{
          return knex.raw(`INSERT INTO book_author (author_id,book_id) SELECT ${id[0]},id FROM book WHERE "Book Title" = '${book}';`);
        });
        return Promise.all(promises).then(()=>{
          return 'Book Added';
        });
      } else {
        console.log('one',author.books.title);
        return knex.raw(`INSERT INTO book_author (author_id,book_id) SELECT ${id[0]},id FROM book WHERE "Book Title" = '${author.books}';`);
      }

    });
  }
};
