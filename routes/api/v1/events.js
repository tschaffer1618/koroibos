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

module.exports = {
  getAllEvents
}
