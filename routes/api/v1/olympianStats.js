var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const getOlympianStats = router.get('/', async (request, response) => {
  const olympianCount = await database('olympians').count('name')
  const maleOlympianAvgWeight = await database('olympians').where({sex: 'M'}).avg('weight')
  const femaleOlympianAvgWeight = await database('olympians').where({sex: 'F'}).avg('weight')
  const olympianAvgAge = await database('olympians').avg('age')
  response.status(200).send({'olympian_stats': {
      'total_competing_olympians': Number(olympianCount[0].count),
      'average_weight': {
        'unit': 'kg',
        'male_olympians': Math.round(maleOlympianAvgWeight[0].avg * 10) / 10,
        'female_olympians': Math.round(femaleOlympianAvgWeight[0].avg * 10) / 10
      },
      'average_age': Math.round(olympianAvgAge[0].avg * 10) / 10
    }
  })
})

module.exports = {
  getOlympianStats
}