var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Book System - Backend');
});

module.exports = router;
