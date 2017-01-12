var express = require('express');
var router = express.Router();
var authorQueries = require('../db/authorQueries');

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

module.exports = router;
