const { Pool } = require("pg");

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool();

function hasConnectionError(err) {
  let isClass08Error = err.code.match(/^08[A-Za-z0-9]{3}/);
  return isClass08Error;
}

function attemptReconnect(client, resolve) {
  const totalAttempts = 5;

  for (let i = totalAttempts; i > 0; i--) {
    client.release();
    setTimeout(() => {
      client = pool.connect();
      client
        .query(text)
        .then((result) => {
          resolve(result);
          return;
        })
        .catch((err) => {
          console.error(
            `Attempts remaining: ${i}\nWhile attempting to reconnect:\n${err.stack}\n`
          );
        });
    }, 5000);
  }
}

module.exports = {
  query: (text) => {
    return new Promise(async (resolve, reject) => {
      let client = await pool.connect();
      await client
        .query(text)
        .then((result) => resolve(result))
        .catch((err) => {
          if (hasConnectionError(err)) {
            attemptReconnect(client, resolve);
          }

          reject(err);
          return;
        })
        .finally(() => client.release());
    });
  },
};
