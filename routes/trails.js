var express = require('express');
var router = express.Router();

const trailsController = require('../controllers/trails');

/* GET home page. */
router.get('/:id', function(req, res, next) {
  trailsController.show(req, res);
});

module.exports = router;
