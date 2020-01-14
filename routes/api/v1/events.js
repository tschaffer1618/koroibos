var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const getAllEvents = router.get('/', async (request, response) => {
  response.status(200).send({'events': []});
})

module.exports = {
  getAllEvents
}
