var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

/* GET users listing. */
router.get('/', function(_req, _res, next) {
  _res.send('respond with a resource');
});

router.post('/user', userController.registrationUser);
router.delete('/user-delete/:email', userController.deleteUser);

module.exports = router;
