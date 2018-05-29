const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
var fetch = require('node-fetch')

var baseUrl = "https://www.hikingproject.com/data/get-trails"
var queryString = `?lat=40.094327&lon=-105.355688&maxResults=500&maxDistance=50&key=200273881-0010c10e936bd0308e4c85c066b06484`

fetch(baseUrl+queryString)
.then(response => response.json())
.then(raw => raw.trails)
.then(trails => trails.forEach(trail => {
  database('trails').insert({
    hp_id: trail.id,
    name: trail.name,
    summary: trail.summary,
    difficulty: trail.difficulty,
    location: trail.location,
    url: trail.url,
    length: trail.length,
    ascent: trail.ascent,
    descent: trail.descent,
    maxElevation: trail.high,
    minElevation: trail.low,
    longitude: trail.longitude,
    latitude: trail.latitude
  })
  .catch(error => console.log(error))
}))
.catch((error) => console.log(error));
