const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const csv = require('csvtojson');

const Olympian = require('./models/olympian')
const Event = require('./models/event')
const OlympianEvent = require('./models/olympianEvent')

async function cleanTables() {
  await database.raw('TRUNCATE TABLE olympian_events CASCADE');
  await database.raw('TRUNCATE TABLE olympians CASCADE');
  await database.raw('TRUNCATE TABLE events CASCADE');
  console.log('Tables have been reset');
}

async function createOlympian(row) {
  let olympian = new Olympian(row);
  let existingOlympian = await database('olympians').where({name: row.Name});
  if (existingOlympian[0]) {
   return existingOlympian[0]
  } else {
   let newOlympian = await database('olympians').insert(olympian).returning('*');
   return newOlympian[0];
  }
}

async function createEvent(row) {
  let event = new Event(row);
  let existingEvent = await database('events').where({event: row.Event});
  if (existingEvent[0]) {
    return existingEvent[0]
  } else {
    let newEvent = await database('events').insert(event).returning('*');
    return newEvent[0];
  }
}

async function createOlympianEvent(row, olympian, event) {
  let olympianEvent = new OlympianEvent(row, olympian, event);
  let existingOlympianEvent = await database('olympian_events')
    .where({olympian_id: olympian.id, event_id: event.id});
  if (existingOlympianEvent[0]) {
    return existingOlympianEvent[0]
  } else {
    let newOlympianEvent = await database('olympian_events').insert(olympianEvent).returning('*');
    return newOlympianEvent[0];
  }
}

async function seedTables(file) {
  await csv()
    .fromFile(file)
    .subscribe(async (row) => {
      var olympian = await createOlympian(row);
      var event = await createEvent(row);
      var olympianEvent = await createOlympianEvent(row, olympian, event);
    })
  console.log('Tables have been seeded')
}

cleanTables();
seedTables('data.csv');
