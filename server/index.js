const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening to port ${port}`));

app.get("/testRoute", (req, res) =>
  res.json({ message: "Hello, world!! I am a server :-)" })
);
