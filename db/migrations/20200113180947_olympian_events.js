
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('olympian_events', function(table) {
      table.increments('id').primary();
      table.integer('olympian_id')
           .unsigned()
           .references('olympians.id')
           .onDelete('CASCADE');
      table.integer('event_id')
           .unsigned()
           .references('events.id')
           .onDelete('CASCADE');
      table.string('medal');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('olympian_events')
  ])
};
