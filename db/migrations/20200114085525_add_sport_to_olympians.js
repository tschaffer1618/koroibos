
exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('olympians', function(table) {
      table.string('sport')
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('olympians', function(table) {
      table.dropColumn('sport')
    })
  ])
};
