const express = require("express");
const cors = require("cors");
const pool = require("./db");

require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening to port ${port}`));
getChampionIds();

// ROUTES //
app.get("/testRoute", cors(), (req, res) =>
  res.json({ message: "Hello, world!! I am a server :-)" })
);

// FUNCTIONS //
function getChampionIds() {
  pool
    .query("SELECT champion_id FROM champion")
    .then((res) => console.log(res.rows))
    .catch((err) => console.log(err));
}
