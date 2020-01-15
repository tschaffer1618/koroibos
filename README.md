# Koroibos Challenge

- Koroibos is an Express API built from CSV data that provides stats for the 2016 Olympic games. The project was completed in 48 hours as a simulated tech challenge as part of the Turing School requirements.

## Local Setup
1. Node.js is necessary to run this program - to install it, [click here](https://nodejs.org/en/)
2. Fork and clone down this repo
3. Install all dependencies by navigating to the root directory in your terminal and running `npm install`
4. Type `psql` in your terminal and run `CREATE DATABASE koroibos_dev` and `CREATE DATABASE koroibos_test` to create your PostgreSQL databases
5. Run table migrations with `knex migrate:latest` and `knex migrate:latest --env test`
6. Seed the development database with `node seedRunner.js`. The console will show the outputs 'The tables have been reset' and 'The tables have been seeded' if the seeding process is successful. Use ctrl-c to exit the file.

## Testing
- To test this app, run `npm test`

## Project Board Link
- This app's project board can be accessed [here](https://github.com/tschaffer1618/koroibos/projects/1)

## Heroku Production Link
- This app and its production endpoints can be accessed [here via Heroku](https://koroibos-ts.herokuapp.com/)

## Contributors
- [Tyler Schaffer](https://github.com/tschaffer1618)

## Primary Tech Stack
- Node.js 12.13.0
- Express 4.16.1
- PostgreSQL 12.1
- Knex 0.19.5
- Jest 24.9.0

## Database Schema
![Database Schema](https://user-images.githubusercontent.com/48742436/72400001-12eb5c00-3705-11ea-924b-265f6d4a748c.png)

## Endpoint Specifications

* `GET api/v1/olympians`

```javascript
//Response Format
{
  "olympians":
    [
      {
        "name": "Maha Abdalsalam",
        "team": "Egypt",
        "age": 18,
        "sport": "Diving"
        "total_medals_won": 0
      },
      {
        "name": "Ahmad Abughaush",
        "team": "Jordan",
        "age": 20,
        "sport": "Taekwondo"
        "total_medals_won": 1
      },
      {...}
    ]
}
```

* `GET api/v1/olympians?age=youngest`

```javascript
//Response Format
{
  [
    {
      "name": "Ana Iulia Dascl",
      "team": "Romania",
      "age": 13,
      "sport": "Swimming"
      "total_medals_won": 0
    }
  ]
}
```

* `GET api/v1/olympians?age=oldest`

```javascript
//Response Format
{
  [
    {
      "name": "Julie Brougham",
      "team": "New Zealand",
      "age": 62,
      "sport": "Equestrianism"
      "total_medals_won": 0
    }
  ]
}
```

* `GET api/v1/olympian_stats`

```javascript
  {
    "olympian_stats": {
      "total_competing_olympians": 3120
      "average_weight:" {
        "unit": "kg",
        "male_olympians": 75.4,
        "female_olympians": 70.2
      }
      "average_age:" 26.2
    }
  }
```

* `GET api/v1/events`

```javascript
//Response Format
{
  "events":
    [
      {
        "sport": "Archery",
        "events": [
          "Archery Men's Individual",
          "Archery Men's Team",
          "Archery Women's Individual",
          "Archery Women's Team"
        ]
      },
      {
        "sport": "Badminton",
        "events": [
          "Badminton Men's Doubles",
          "Badminton Men's Singles",
          "Badminton Women's Doubles",
          "Badminton Women's Singles",
          "Badminton Mixed Doubles"
        ]
      },
      {...}
    ]
}
```

* `GET api/v1/events/:id/medalists`

```javascript
//Response Format
{
  "event": "Badminton Mixed Doubles",
  "medalists": [
      {
        "name": "Tontowi Ahmad",
        "team": "Indonesia-1",
        "age": 29,
        "medal": "Gold"
      },
      {
        "name": "Chan Peng Soon",
        "team": "Malaysia",
        "age": 28,
        "medal": "Silver"
      }
    ]
}
```
