const express = require("../../node_modules/express");
const router = express.Router();

const happiness_stats = require("./happiness-stats");

router.use("/happiness-stats", happiness_stats);

module.exports = router;