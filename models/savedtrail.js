const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const findByUser = (user_id) => {
  return database.raw(`SELECT * FROM saved_trails
                      WHERE saved_trails.user_id = ?`, user_id);
}

const create = (trail_id, user_id) => {
  return database.raw(`INSERT INTO saved_trails
                      (trail_id, user_id, created_at, updated_at)
                      VALUES (?, ?, ?, ?)`, [trail_id, user_id, new Date, new Date])
}

module.exports = {
  findByUser,
  create
}
