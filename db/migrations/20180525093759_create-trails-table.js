
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trails', function(t) {
    t.increments();
    t.integer('osm_id');
    t.integer('name');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trails');
};
