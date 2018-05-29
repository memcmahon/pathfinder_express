
exports.up = function(knex, Promise) {
  return knex.schema.createTable('nodes', function(t) {
    t.increments();
    t.integer('legacy_id');
    t.float('latitude');
    t.float('longitude');
    t.integer('trail_id').references('trails.id');
    t.timestamps();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('nodes');
};
