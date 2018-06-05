
exports.up = function(knex, Promise) {
  return knex.schema.createTable('saved_trails', function(t) {
    t.increments();
    t.integer('user_id').references('users.id');
    t.integer('trails_id').references('trails.id');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('saved_trails');
};
