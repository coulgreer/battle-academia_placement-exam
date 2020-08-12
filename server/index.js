const express = require("express");
const cors = require("cors");

const v1Champions = require("./api/v1/champions");
const v1Summoners = require("./api/v1/summoners");
const v1Versions = require("./api/v1/versions");

require("dotenv").config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.HOST_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening to port ${port}`));

// ROUTES //
app.use("/api/v1/champions", v1Champions);
app.use("/api/v1/summoners", v1Summoners);
app.use("/api/v1/versions", v1Versions);
