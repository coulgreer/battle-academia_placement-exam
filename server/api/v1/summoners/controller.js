const db = require("../../../db");

exports.suggestions = (request, response) => {
  db
    .query(
      `SELECT * FROM summoner WHERE summoner_name='${request.params.name}' AND platform='${request.params.platform}'`
    )
    .then((result) => {
      let hasEmptyResult = result.rows.length == 0;

      if (hasEmptyResult) {
        response.status(404).send({
          code: 404,
          message: "Platform-Summoner combo does not exist.",
        });
      }
      response.json(result.rows[0]);
    })
    .catch((error) => console.error(error));
};
