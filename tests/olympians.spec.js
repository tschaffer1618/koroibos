var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const seed = require('../seedRunnerHelper')

describe('Test', () => {
  beforeEach(async () => {
    await database.raw('TRUNCATE TABLE olympian_events CASCADE');
    await database.raw('TRUNCATE TABLE olympians CASCADE');
    await database.raw('TRUNCATE TABLE events CASCADE');

    const row1 = {
      Name: 'Aquaman',
      Sex: 'M',
      Age: 35,
      Height: 180,
      Weight: 96,
      Team: 'Superhero',
      Sport: 'Swimming',
      Event: '100m Fly',
      Medal: 'Gold'
    }

    const row2 = {
      Name: 'Michael Phelps',
      Sex: 'M',
      Age: 32,
      Height: 176,
      Weight: 80,
      Team: 'Human',
      Sport: 'Swimming',
      Event: '5000m Freestyle',
      Medal: 'Silver'
    }

    const row3 = {
      Name: 'Little Mermaid',
      Sex: 'F',
      Age: 24,
      Height: 140,
      Weight: 62,
      Team: 'Mermaid',
      Sport: 'Swimming',
      Event: '100m Fly',
      Medal: 'Bronze'
    }

    let aquaman = await seed.createOlympian(row1);
    let phelps = await seed.createOlympian(row2);
    let mermaid = await seed.createOlympian(row3);

    let fly = await seed.createEvent(row1);
    let free = await seed.createEvent(row2);

    await seed.createOlympianEvent(row1, aquaman, fly);
    await seed.createOlympianEvent(row2, phelps, free);
    await seed.createOlympianEvent(row3, mermaid, fly);
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
      expect(res.body).toHaveProperty('olympians');
      expect(res.body.olympians.length).toBe(3);
    })
  })
})