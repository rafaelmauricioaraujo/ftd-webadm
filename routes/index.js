var express = require('express');
require('dotenv').config();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  global.db.findAll(function(err, docs) {

    if(err) { 
      return console.log(err) 
    }
    res.render('index', { title: 'Lista de serviços ', docs: docs });
  });
});

module.exports = router;
