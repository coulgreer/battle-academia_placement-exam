const { Pool } = require("pg");


// Test to see if actually connected to database. If not, retry at least 5 times.
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool();

module.exports = pool;
