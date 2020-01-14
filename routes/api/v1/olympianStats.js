var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const getOlympianStats = router.get('/', async (request, response) => {

}

module.exports = {
  getOlympianStats
}