const pool = require("../../../db");

exports.champion_list = (request, response) => {
  pool
    .query("SELECT * FROM champion")
    .then((result) => response.json(result.rows))
    .catch((err) => console.error(err.stack));
};

exports.champion_detail = (request, response) => {
  const queryText = `SELECT * FROM champion WHERE champion_id='${request.params.championId}'`;

  pool
    .query(queryText)
    .then((result) => {
      let hasEmptyResult = result.rows.length == 0;

      if (hasEmptyResult) {
        response.status(404).send({
          code: 404,
          message: "Champion ID does not exist.",
        });
      }

      response.json(result.rows[0]);
    })
    .catch((err) => console.error(err));
};
