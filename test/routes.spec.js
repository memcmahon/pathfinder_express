const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done()
  });

  it('should return the home page with text', () => {
    return chai.request(server)
    .get('/')
    .then((response) => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch((error) => {
      throw error;
    })
  })

  it('should return the home page with text', () => {
    return chai.request(server)
    .get('/?min_length=2&max_length=3&max_elevation_gain=500')
    .then((response) => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch((error) => {
      throw error;
    })
  })

  it('should return the home page with text', () => {
    return chai.request(server)
    .get('/?min_length=&max_length=&max_elevation_gain=')
    .then((response) => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch((error) => {
      throw error;
    })
  })

  it('should return 404 if route not found', () => {
    return chai.request(server)
    .get('/helloworld')
    .then((response) => {
      response.should.have.status(404);
    })
  })

  it('should return single trail page', () => {
    return chai.request(server)
    .get('/trails/1')
    .then((response) => {
      response.should.have.status(200);
    })
  })

  it('should return sign up page', () => {
    return chai.request(server)
    .post('/signup')
    .send({
      firstName: "Megan",
      lastName: "McMahon",
      email: "test@example.com",
      password: "test"
    })
    .then((response) => {
      response.should.have.status(200);
    })
  })
