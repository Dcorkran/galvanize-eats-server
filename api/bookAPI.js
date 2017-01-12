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

module.exports = router;
