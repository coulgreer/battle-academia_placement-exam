const db = require("../../../db");

exports.champion_list = async (request, response) => {
  try {
    const championQuery = `SELECT * FROM champion`;
    let results = await db.query(championQuery);
    response.json(results.rows);
  } catch (err) {
    response.status(500).send({
      code: err.code,
      message: "Server error while communicating with database!",
    });
  }
};

exports.champion_detail = async (request, response) => {
  try {
    const queryText = `SELECT * FROM champion WHERE champion_id='${request.params.championId}'`;
    let results = await db.query(queryText);
    if (hasEmptyResult(results)) {
      response.status(404).send({
        code: 404,
        message: "Champion ID does not exist.",
      });
    }
    response.json(results.rows[0]);
  } catch (err) {
    response.status(500).send({
      code: err.code,
      message: "Server error while communicating with database!",
    });
  }
};

function hasEmptyResult(result) {
  return result.rows.length == 0;
}
