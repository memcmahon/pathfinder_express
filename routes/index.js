var express = require('express');
var router = express.Router();

const trailsController = require('../controllers/trails');

/* GET home page. */
router.get('/', function(req, res, next) {
  trailsController.index(req, res);
});

module.exports = router;
