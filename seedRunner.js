const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const csv = require('csvtojson');

const Olympian = require('./models/olympian')

async function cleanTables() {
  // await database.raw('TRUNCATE TABLE olympian_events CASCADE');
  await database.raw('TRUNCATE TABLE olympians CASCADE');
  // await database.raw('TRUNCATE TABLE events CASCADE');
  console.log('Tables have been reset');
}

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

// async function createEvent(row) {
//
// }

// async function createOlympianEvent(row) {
//
// }

async function seedTables(file) {
  await csv()
    .fromFile(file)
    .subscribe(async (row) => {
      var olympian = await createOlympian(row);
    })
  console.log('Tables have been seeded')
}

cleanTables();
seedTables('data.csv');
