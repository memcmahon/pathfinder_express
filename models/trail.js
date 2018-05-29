const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => {
  return database.raw('SELECT * FROM trails');
}

const find = (id) => {
  return database.raw(`SELECT trails.* FROM trails
                      WHERE trails.id = ?`, id)
}

module.exports = {
  all,
  find
}
