
exports.up = function(knex, Promise) {
  return knex.schema.table('trails', function(t) {
    t.boolean('mapped').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('trails', function(t) {
    t.dropColumn('mapped');
  });
};
