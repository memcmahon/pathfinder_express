var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/users');

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  UsersController.create(req, res);
});

router.post('/login', function(req, res, next) {
  UsersController.logIn(req, res);
});

module.exports = router;
