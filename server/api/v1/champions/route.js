const express = require("express");
const router = express.Router();

const controller = require("./controller.js");

router.get("/", controller.champion_list);
router.get("/:championId", controller.champion_detail);

module.exports = router;
