
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('olympians', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('sex');
      table.integer('age');
      table.integer('height');
      table.integer('weight');
      table.string('team');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('olympians')
  ])
};
