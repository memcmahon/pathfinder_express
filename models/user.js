const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const create = (req, res) => {
  const user = req.body
  // console.log(user)
  hashPassword(user.password)
    .then((hashedPassword) => {
      delete user.password
      user.password_digest = hashedPassword
    })
    .then(() => createToken())
    .then(token => user.token = token)
    .then(() => createUser(user))
    .then(user => {
      delete user.password_digest
      req.session.user = user;
      res.status(201).redirect('/')
    })
    .catch((error) => console.log(error))
}

const logIn = (req, res) => {
  const userReq = req.body
  let user

  return findByEmail(userReq)
  .then((foundUser) => {
    user = foundUser
    return checkPassword(userReq.password, user)
  })
  .then(() => createToken())
  .then(token => {
    return updateToken(user, token)
  })
  .then(() => {
    delete user.password_digest
    req.session.user = user;
    res.status(200).redirect('/')
  })
  .catch((error) => console.log({error}))
}

const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (error, hash) => {
      error ? reject(error) : resolve(hash)
    })
  )
}

const createUser = (user) => {
  return database.raw(
    `INSERT INTO users
    (email, first_name, last_name, password_digest, token, created_at, updated_at)
    VALUES (?,?,?,?,?,?,?) RETURNING id, email, created_at, token`,
    [user.email, user.firstName, user.lastName, user.password_digest, user.token, new Date(), new Date()])
    .then((data) => data.rows[0])
}

const findByEmail = (user) => {
  return database('users')
    .where('email', user.email)
    .then((rows) => rows[0])
}

const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (error, data) => {
      error ? reject(error) : resolve(data.toString('base64'))
    })
  })
}

const updateToken = (user, newToken) => {
  // console.log(user)
  return database('users')
    .where('id', user.id)
    .update('token', newToken)
    .returning('*')
}

const checkPassword = (password, user) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password_digest, (error, response) => {
      if (error) {
        reject(error)
      } else if (response) {
        resolve(response)
      } else {
        reject(new Error('Passwords do not match!'))
      }
    })
  })
}

module.exports = {
  create,
  logIn
}
