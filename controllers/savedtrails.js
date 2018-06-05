const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const SavedTrail = require('../models/savedtrail');

const index = (req, res) => {
  var userId = req.session.user.id;
  SavedTrail.findByUser(userId)
  .then(data => {
    res.render('savedIndex', {trails: data.rows})
  })
}

module.exports = {
  index
}
