# Parks and Checks

Deployed on Heroku: [PathFinder](http://pathfinderco.herokuapp.com/)

Pathfinder is a trail finding application for those of us who are geographically or topographically challenged.  For the boulder county area, users can filter trails by distance and elevation gained and view a graphical representation of that elevation gain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Google Maps API key](https://developers.google.com/maps/documentation/javascript/tutorial)
* [Hiking Project API key](https://www.hikingproject.com/data)

### Installing

A step by step series of examples that tell you have to get a development env running

Clone and CD into the repo and bundle:

`$ git clone https://github.com/memcmahon/pathfinder_express.git`

`$ cd pathfinder_express`

`$ npm install`


The next step may take a few minutes, create the database, migrate and seed:

```
$ psql 

    CREATE DATABASE pathfinder_express;

    CREATE DATABASE pathfinder_express_test;
    
$ knex migrate:latest
$ node load_boulder_county.js
$ node load_nodes.js
```


to run locally:

`$ nodemon bin/www`


## Running the test suite

To run the test suite:

`$ npm test`


## Built With

* [Express](https://expressjs.com/)
* [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial)
* [Hiking Project](https://www.hikingproject.com/data)


## Authors

* **Megan McMahon**

