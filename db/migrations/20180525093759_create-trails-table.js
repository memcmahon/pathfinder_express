
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trails', function(t) {
    t.increments();
    t.integer('osm_id');
    t.string('name');
    t.string('state');
    t.string('county');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trails');
};
