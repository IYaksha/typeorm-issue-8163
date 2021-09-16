const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  "type": "postgres",
  "host": "db",
  "port": 5432,
  "username": "postgres",
  "password": "root",
  "database": "postgres",
  "synchronize": true,
  "logging": true,
  "entities": [
     "src/entity/**/*.ts"
  ],
  "migrations": [
     "src/migration/**/*.ts"
  ],
  "subscribers": [
     "src/subscriber/**/*.ts"
  ],
  "cli": {
     "entitiesDir": "src/entity",
     "migrationsDir": "src/migration",
     "subscribersDir": "src/subscriber"
  },
  namingStrategy: new SnakeNamingStrategy(),
}
