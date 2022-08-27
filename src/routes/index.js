var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(_req, _res, next) {
  _res.statusCode(200);
  
});

module.exports = router;
