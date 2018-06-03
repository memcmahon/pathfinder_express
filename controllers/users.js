const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const User = require('../models/user');

const create = (req, res) => {
   User.create(req, res)
}

const logIn = (req, res) => {
  User.logIn(req, res)
}

module.exports = {
  create,
  logIn
}