const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const findByUser = (user_id) => {
  return database.raw(`SELECT * FROM saved_trails
                      WHERE saved_trails.user_id = ?`, user_id);
}

module.exports = {
  findByUser
}
