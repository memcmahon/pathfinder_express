const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const Trail = require('../models/trail');

const index = (req, res) => {
  Trail.all()
  .then(data => {
    res.render('index', {trails: data.rows})
  })
}

module.exports = {
  index
}
