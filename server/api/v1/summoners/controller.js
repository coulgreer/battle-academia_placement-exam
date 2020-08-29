const db = require("../../../db");

exports.suggestions = async (request, response) => {
  try {
    const summonerQuery = `SELECT * FROM summoner WHERE summoner_name='${request.params.name}' AND platform='${request.params.platform}'`;
    let results = await db.query(summonerQuery);
    if (hasEmptyResult(results)) {
      response.status(404).send({
        code: 404,
        message: "Platform-Summoner combo does not exist.",
      });
    }
    const summoner = results.rows[0];

    const summonerPuuid = summoner.puuid;
    const championPointsQuery = `SELECT champion_points_data FROM champion_points WHERE summoner_puuid='${summonerPuuid}'`;
    results = await db.query(championPointsQuery);
    if (hasEmptyResult(results)) {
      response.status(404).send({
        code: 404,
        message: "Summoner with derived PUUID does not exist.",
      });
    }
    const championPoints = results.rows[0];

    response.json(championPoints);
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
