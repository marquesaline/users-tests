var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.send('respond with a resource');
});

router.post('/user', userController.registrationUser);
router.post('/auth', userController.authentication);
router.delete('/user-delete/:email', userController.deleteUser);

module.exports = router;
