const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const Olympian = require('./models/olympian')
const Event = require('./models/event')
const OlympianEvent = require('./models/olympianEvent')

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

module.exports = {
  createOlympian,
  createEvent,
  createOlympianEvent
}