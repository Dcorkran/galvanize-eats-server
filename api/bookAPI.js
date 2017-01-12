var express = require('express');
var router = express.Router();
var bookQueries = require('../db/bookQueries');
var apiFunctions = require('./apiFunctions');

router.get('/',function(req,res,next){
  bookQueries.getAllBooks()
  .then((data)=>{
    res.json(data);
  });
});

router.post('/',function(req,res,next){
  let bookData = req.body;
  bookData.authors = apiFunctions.cleanAuthorName(bookData.authors);
  bookQueries.postBook(bookData)
  .then((data)=>{
    res.json(data);
  });
});

router.delete('/',function(req,res,next){
  bookQueries.deleteBook(req.body.id);
  res.json('Book Deleted');
});

router.get('/:id',function(req,res,next){
  bookQueries.getOneBook(req.params.id)
  .then((data)=>{
    res.json(data);
  })
});

router.put('/:id',function(req,res,next){
  bookQueries.updateBook(req.params.id,req.body)
  .then(()=>{
    res.json('Book Updated');
  });
});

module.exports = router;
