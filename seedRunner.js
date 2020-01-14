const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const csv = require('csvtojson');

const Olympian = require('./models/olympian')
const Event = require('./models/event')
const OlympianEvent = require('./models/olympianEvent')

const seed = require('./seedRunnerHelper')

async function cleanTables() {
  await database.raw('TRUNCATE TABLE olympian_events CASCADE');
  await database.raw('TRUNCATE TABLE olympians CASCADE');
  await database.raw('TRUNCATE TABLE events CASCADE');
  console.log('Tables have been reset');
}

async function seedTables(file) {
  await csv()
    .fromFile(file)
    .subscribe(async (row) => {
      var olympian = await seed.createOlympian(row);
      var event = await seed.createEvent(row);
      var olympianEvent = await seed.createOlympianEvent(row, olympian, event);
    })
  console.log('Tables have been seeded')
}

cleanTables();
seedTables('data.csv');
