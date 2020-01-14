var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const getAllOlympians = router.get('/', async (request, response) => {
  const olympians = await database('olympians').select('name', 'team', 'age', 'sport');
  response.status(200).send(olympians);
})

module.exports = {
  getAllOlympians
}