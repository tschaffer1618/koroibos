var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test', () => {
  beforeEach(async () => {
    await database.raw('TRUNCATE TABLE olympian_events CASCADE');
    await database.raw('TRUNCATE TABLE olympians CASCADE');
    await database.raw('TRUNCATE TABLE events CASCADE');

    const olympian1 = {
      name: 'Aquaman',
      sex: 'M',
      age: 35,
      height: 180,
      weight: 96,
      team: 'Superhero',
      sport: 'Swimming'
    }

    const olympian2 = {
      name: 'Michael Phelps',
      sex: 'M',
      age: 32,
      height: 176,
      weight: 80,
      team: 'Human',
      sport: 'Swimming'
    }

    const olympian3 = {
      name: 'Little Mermaid',
      sex: 'F',
      age: 24,
      height: 140,
      weight: 62,
      team: 'Mermaid',
      sport: 'Swimming'
    }

    const event1 = {
      sport: 'Swimming',
      event: '100m Fly'
    }

    const event2 = {
      sport: 'Swimming',
      event: '5000m Freestyle'
    }

    let aquaman = await database('olympians').insert(olympian1, 'id')
    let phelps = await database('olympians').insert(olympian2, 'id')
    let mermaid = await database('olympians').insert(olympian3, 'id')

    let fly = await database('events').insert(event1, 'id')
    let free = await database('events').insert(event2, 'id')

    const olympianEvent1 = {
      olympian_id: aquaman.id,
      event_id: fly.id,
      medal: 'Gold'
    }

    const olympianEvent2 = {
      olympian_id: aquaman.id,
      event_id: free.id,
      medal: 'Bronze'
    }

    const olympianEvent3 = {
      olympian_id: mermaid.id,
      event_id: fly.id,
      medal: 'Silver'
    }
    const olympianEvent4 = {
      olympian_id: phelps.id,
      event_id: fly.id,
      medal: 'Silver'
    }
    const olympianEvent5 = {
      olympian_id: phelps.id,
      event_id: free.id,
      medal: 'Gold'
    }

    await database('olympian_events').insert(olympianEvent1, 'id')
    await database('olympian_events').insert(olympianEvent2, 'id')
    await database('olympian_events').insert(olympianEvent3, 'id')
    await database('olympian_events').insert(olympianEvent4, 'id')
    await database('olympian_events').insert(olympianEvent5, 'id')
  })

  afterEach(() => {
    database.raw('TRUNCATE TABLE olympian_events CASCADE');
    database.raw('TRUNCATE TABLE olympians CASCADE');
    database.raw('TRUNCATE TABLE events CASCADE');
  })

  describe('GET all olympians', () => {
    it('from the olympians endpoint', async () => {
      const res = await request(app).get('/api/v1/olympians');

      expect(res.statusCode).toBe(200);
    })
  })
})