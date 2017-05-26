exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.string('username').unique();
      table.string('email');
      table.string('password');
    }),
    knex.schema.table('restaurant', function(table) {
      table.string('restaname').unique();
      table.string('password');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('username');
      table.dropColumn('email');
      table.dropColumn('password');
    }),
    knex.schema.table('restaurant', function(table) {
      table.dropColumn('restaname');
      table.dropColumn('password');
    })
  ])
};
