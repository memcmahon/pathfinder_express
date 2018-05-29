const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => {
  return database.raw('SELECT * FROM trails');
}

const find = (id) => {
  return database.raw(`SELECT trails.*,
                      JSON_AGG(json_build_object('leg_id', nodes.legacy_id, 'lat', nodes.latitude, 'lng', nodes.longitude) ORDER BY nodes.legacy_id)
                      FROM trails
                      JOIN nodes ON nodes.trail_id = trails.id
                      WHERE trails.id = ? GROUP BY trails.id`, id)
}

module.exports = {
  all,
  find
}
