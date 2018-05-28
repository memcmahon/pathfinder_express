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

const show = (req, res) => {
  Trail.find(req.params["id"])
  .then(data => {
    res.render('trails/show', {trail: data.rows[0], nodes: data.rows[0].json_agg});
  })
}

module.exports = {
  index,
  show
}
