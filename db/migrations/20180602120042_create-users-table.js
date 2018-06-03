
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.increments();
    t.string('email');
    t.string('first_name');
    t.string('last_name');
    t.string('password_digest');
    t.string('token');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
