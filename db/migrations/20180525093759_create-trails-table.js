
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trails', function(t) {
    t.increments();
    t.integer('hp_id');
    t.string('name');
    t.string('summary');
    t.string('difficulty');
    t.string('location');
    t.string('url');
    t.float('length');
    t.float('ascent');
    t.float('descent');
    t.float('maxElevation');
    t.float('minElevation');
    t.float('longitude');
    t.float('latitude');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trails');
};
