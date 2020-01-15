var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

async function getAllEventsBySport() {
  var allSports = await database('events').select('sport').distinct()
  var finalArray = await Promise.all(allSports.map(async (sport_hash) => {
    var events = await database('events').where({sport: sport_hash.sport}).select('event').distinct()
    var eventsArray = await Promise.all(events.map(async (event_hash) => {
      return event_hash.event
    }))
    return {'sport': sport_hash.sport, 'events': eventsArray}
  }))
  return finalArray
}

const getAllEvents = router.get('/', async (request, response) => {
  const data = await getAllEventsBySport()
  response.status(200).send({'events': data});
})

async function getMedalists(eventId) {
  var medalists = await database('olympian_events')
    .innerJoin('olympians', 'olympian_events.olympian_id', 'olympians.id')
    .innerJoin('events', 'olympian_events.event_id', 'events.id')
    .where('olympian_events.event_id', eventId)
    .whereIn('olympian_events.medal', ['Gold', 'Silver', 'Bronze'])
    .select('olympians.name', 'olympians.team', 'olympians.age', 'olympian_events.medal')
    .orderByRaw("CASE WHEN medal = 'Gold' THEN '1' WHEN medal = 'Silver' THEN '2' WHEN medal = 'Bronze' THEN '3' END")
  if (medalists[0]) {
    return medalists
  } else {
    return []
  }
}

const getEventMedalists = router.get('/:id/medalists', async (request, response) => {
  const eventId = request.params.id;
  const chosenEvent = await database('events').where('id', eventId);
  if (chosenEvent[0]) {
    const data = await getMedalists(eventId);
    response.status(200).send({'event': chosenEvent[0].event, 'medalists': data })
  } else {
    response.status(404).send({ error: 'Event not found' })
  }
})

module.exports = {
  getAllEvents,
  getEventMedalists
}
