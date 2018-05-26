const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
var fetch = require('node-fetch')

var baseUrl = "http://overpass-api.de/api/interpreter"
var boulderGeoBounds = "39.927612, -105.696267,40.261810, -105.054918"
var queryString = `?data=[out:json][timeout:25];(way["highway"="path"](${boulderGeoBounds});way["highway"="track"](${boulderGeoBounds});way["highway"="cycleway"](${boulderGeoBounds}););out ids geom tags;`

fetch(baseUrl+queryString)
.then(response => response.json())
.then(raw => raw.elements)
.then(trails => trails.forEach(trail => {
  var all_notes = trail.tags.note+" "+trail.tags.access+" "+trail.tags.description

  database('trails').insert({osm_id: trail.id,
                             name: trail.tags.name,
                             state: "Colorado",
                             county: "Boulder"}).returning('id')
  .then(id => {
    database('tags').insert({trail_id: id[0],
                            notes: all_notes,
                            surface: trail.tags.surface,
                            foot: trail.tags.foot,
                            bicycle: trail.tags.bicycle,
                            horse: trail.tags.horse,
                            golf_cart: trail.tags.golf_cart,
                            motor_vehicle: trail.tags.motor_vehicle,
                            highway: trail.tags.highway,
                            website: trail.tags.website})
      .then(trail => console.log("created tags"))
      .catch(error => console.log(error));

      trail.geometry.forEach(node => {
        database('nodes').insert({trail_id: id[0],
                                  latitude: node.lat,
                                  longitude: node.lon})
          .then(trail => console.log("created nodes"))
          .catch(error => console.log(error));
        });
  })
  .catch(error => console.log(error))
}))
.catch(error) => console.log(error));
