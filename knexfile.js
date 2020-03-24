module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/dev.sqlite3"
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./db/prod.sqlite3"
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./db/test.sqlite3"
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
