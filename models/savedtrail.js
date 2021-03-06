const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const findByUser = (user_id) => {
  return database.raw(`SELECT trails.*, saved_trails.user_id,
                      JSON_AGG(json_build_object('lat', nodes.latitude, 'lng', nodes.longitude, 'leg_id', nodes.legacy_id)ORDER BY nodes.legacy_id) AS nodes
                      FROM saved_trails
                      JOIN trails ON saved_trails.trail_id = trails.id
                      JOIN nodes on nodes.trail_id = trails.id WHERE saved_trails.user_id = ?
                      GROUP BY trails.id, saved_trails.user_id`, user_id);
}

const create = (trail_id, user_id) => {
  return database.raw(`INSERT INTO saved_trails
                      (trail_id, user_id, created_at, updated_at)
                      VALUES (?, ?, ?, ?)`, [trail_id, user_id, new Date, new Date])
          .catch((error) => {
            console.log(error);
          })
}

const destroy = (trail_id, user_id) => {
  console.log('model', trail_id, user_id)
  return database.raw(`DELETE FROM saved_trails
                      WHERE trail_id = ? AND user_id = ?`, [trail_id, user_id])
          .catch((error) => {
            console.log(error);
          })
}

module.exports = {
  findByUser,
  create,
  destroy
}
