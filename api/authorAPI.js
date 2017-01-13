var express = require('express');
var router = express.Router();
var authorQueries = require('../db/authorQueries');
var bookQueries = require('../db/bookQueries');

router.get('/',function(req,res,next){
  authorQueries.getAuthors()
  .then((authors)=>{
    res.json(authors);
  });
});

router.post('/',function(req,res,next){
  authorQueries.postAuthor(req.body)
  .then((data)=>{
    res.json(data);
  });
});

router.delete('/',function(req,res,next){
  authorQueries.deleteAuthor(req.body.id)
  .then((data)=>{
    res.json(data);
  });
});

router.get('/:id',function(req,res,next){
  authorQueries.getOneAuthor(req.params.id)
  .then((data)=>{
    res.json(data);
  });
});

router.put('/:id',function(req,res,next){
  authorQueries.updateAuthor(req.params.id,req.body)
  .then(()=>{
    res.json('Book Updated');
  });
});

router.get('/books/:id',function(req,res,next){
  console.log('yo');
  authorQueries.getBooksByAuthor(req.params)
  .then((data)=>{
    res.json(data);
  });
});


module.exports = router;
