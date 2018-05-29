const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
var fetch = require('node-fetch')

fetch("https://trailnodes.herokuapp.com/api/v1/nodes")
.then(response => response.json())
.then(nodes => nodes.forEach(node => {
  database.raw('SELECT id FROM trails WHERE hp_id = ?', node.trail_id)
  .then(raw => raw.rows[0].id)
  .then(id => {
    database('nodes').insert({
      legacy_id: node.id,
      trail_id: id,
      latitude: node.latitude,
      longitude: node.longitude
    }).returning('id')
    .then(node => console.log(`created node ${node}`))
    .catch(error => console.log(error))
  })
}))
.catch((error) => console.log(error));
