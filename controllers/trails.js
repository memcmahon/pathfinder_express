const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const Trail = require('../models/trail');

const index = (req, res) => {
  if (req.query.min_length === undefined && req.query.max_elevation_gain === undefined) {
    Trail.all()
    .then(data => {
      res.render('index', {trails: data.rows})
    })
  } else if (req.query.min_length === "" && req.query.max_length === "" && req.query.max_elevation_gain === "") {
    Trail.all()
    .then(data => {
      res.render('index', {trails: data.rows})
    })
  } else {
    Trail.findByQuery(req.query.min_length, req.query.max_length, req.query.max_elevation_gain)
    .then(data => {
      console.log(data.rows)
      res.render('index', {trails: data.rows})
    })
  }
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
