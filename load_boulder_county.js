const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
var fetch = require('node-fetch')
var baseUrl = "http://overpass-api.de/api/interpreter"
var boulderGeoBounds = "39.927612, -105.696267,40.261810, -105.054918"
var queryString = `?data=[out:json][timeout:25];(way["highway"="path"](${boulderGeoBounds});way["highway"="track"](${boulderGeoBounds});way["highway"="cycleway"](${boulderGeoBounds}););out ids geom tags;`
pry = require('pryjs')

const request = fetch(baseUrl+queryString)
.then(response => response.json())
.then(raw => raw.elements)
.then(trails => trails.forEach(trail => {
  database('trails').insert({osm_id: trail.id, name: trail.tags.name})
  .catch(error => console.log(error))
}))

module.exports = {
  request
}
