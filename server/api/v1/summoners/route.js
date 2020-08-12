const express = require("express");
const router = express.Router();

const controller = require("./controller.js");

router.get("/:platform/:name/suggestions", controller.suggestions);

module.exports = router;
