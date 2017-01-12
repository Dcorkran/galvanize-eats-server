var express = require('express');
var router = express.Router();
var queries = require('../db/bookQueries');

router.get('/',function(req,res,next){
  queries.getAllBooks()
  .then((data)=>{
    res.json(data);
  });
});

module.exports = router;
