const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => {
  return database.raw(`SELECT trails.*, saved_trails.user_id,
                      JSON_AGG(json_build_object('leg_id', nodes.legacy_id, 'lat', nodes.latitude, 'lng', nodes.longitude) ORDER BY nodes.legacy_id)
                      FROM trails
                      LEFT JOIN saved_trails ON saved_trails.trail_id = trails.id
                      JOIN nodes ON nodes.trail_id = trails.id
                      GROUP BY trails.id, saved_trails.id`);
}

const findByQuery = (minLength, maxLength, maxElevation) => {
  return database.raw(`SELECT * FROM
                      (SELECT trails.*, sum(max_elevation - min_elevation) as elevation_gain
                      FROM trails
                      GROUP BY trails.id) as t WHERE elevation_gain < ? AND length >= ? AND length <= ?`, [maxElevation, minLength, maxLength])
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
  find,
  findByQuery
}
