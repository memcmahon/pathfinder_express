const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const Trail = require('../models/trail');

const index = (req, res) => {
  if (req.query.min_length === undefined && req.query.max_elevation_gain === undefined) {
    Trail.all()
    .then(data => {
      res.render('index', {trails: data.rows, user: req.session.user})
    })
  } else if (req.query.min_length === "" && req.query.max_length === "" && req.query.max_elevation_gain === "") {
    Trail.all()
    .then(data => {
      res.render('index', {trails: data.rows, user: req.session.user})
    })
  } else {
    Trail.findByQuery(req.query.min_length, req.query.max_length, req.query.max_elevation_gain)
    .then(data => {
      res.render('index', {trails: data.rows, user: req.session.user})
    })
  }
}

const show = (req, res) => {
  Trail.find(req.params["id"])
  .then(data => {
    res.render('trails/show', {trail: data.rows[0], nodes: data.rows[0].json_agg, user: req.session.user});
  })
}

module.exports = {
  index,
  show
}
