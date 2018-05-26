
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(t) {
    t.increments();
    t.string('notes');
    t.string('surface')
    t.string('foot');
    t.string('bicycle');
    t.string('horse');
    t.string('golf_cart');
    t.string('motor_vehicle');
    t.string('highway');
    t.string('website');
    t.integer('trail_id').references('trails.id');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
