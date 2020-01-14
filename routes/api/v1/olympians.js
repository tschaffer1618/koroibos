var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const getAllOlympians = router.get('/', async (request, response) => {
  const olympians = await database.raw('SELECT name, team, age, sport, ' +
    'CAST(COUNT(CASE WHEN medal IS NOT NULL THEN 1 END) AS int) ' +
    'AS total_medals_won FROM olympians ' +
    'INNER JOIN olympian_events ON olympians.id = olympian_events.olympian_id ' +
    'GROUP BY olympians.name, olympians.team, olympians.age, olympians.sport');
  response.status(200).send({'olympians': olympians['rows']});
})

module.exports = {
  getAllOlympians
}