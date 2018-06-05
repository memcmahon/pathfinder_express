var express = require('express');
var router = express.Router();

const savedTrailsController = require('../controllers/savedtrails');

/* GET home page. */
router.get('/', function(req, res, next) {
  savedTrailsController.index(req, res);
});

router.post('/', function(req, res, next) {
  savedTrailsController.create(req, res)
});

module.exports = router;
