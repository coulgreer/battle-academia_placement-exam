const fetch = require("node-fetch");
const pool = require("../../../db");

exports.versions_list = (request, response) => {
  fetch("https://ddragon.leagueoflegends.com/api/versions.json")
    .then((response) => response.json())
    .then((json) => response.json(json))
    .catch((error) => console.error(error));
};
