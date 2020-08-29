const { Pool } = require("pg");

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool();

module.exports = {
  query: async (text) => {
    console.info("\nAttempting connection...");
    let client = await attemptConnection();
    console.info("Connection successful");

    try {
      console.info("\nRunning query...")
      return await client.query(text);
    } finally {
      client.release();
    }
  },
};

async function attemptConnection() {
  const maxAttempts = 5;

  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    try {
      return await pool.connect();
    } catch (err) {
      console.info(
        `Error while connecting. Retrying: attempt ${attempts + 1}/${maxAttempts}`
      );
      if (attempts < maxAttempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        throw err;
      }
    }
  }
}
