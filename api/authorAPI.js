var express = require('express');
var router = express.Router();
var authorQueries = require('../db/authorQueries');

router.get('/',function(req,res,next){
  authorQueries.getAuthors()
  .then((authors)=>{
    res.json(authors);
  });
});

module.exports = router;
