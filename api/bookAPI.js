var express = require('express');
var router = express.Router();
var queries = require('../db/bookQueries');

router.get('/test',function(req,res,next){
  console.log('hello');
  queries.getAllBooks()
  .then((data)=>{
    res.json(data);
  });
});

module.exports = router;
