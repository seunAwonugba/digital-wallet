const express = require("express");
const cardRouter = express.Router();
const { chargeCard } = require("../controller/card");

cardRouter.post("/charge-card", chargeCard);

module.exports = { cardRouter };
