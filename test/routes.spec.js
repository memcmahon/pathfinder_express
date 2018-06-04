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

