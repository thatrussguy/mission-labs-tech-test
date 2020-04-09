const knex = require("knex");

const ENV = process.env.NODE_ENV || "development";

const dbConfig = require("../knexfile");

module.exports = knex(dbConfig[ENV]);
