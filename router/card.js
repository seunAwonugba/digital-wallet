const express = require("express");
const card = express.Router();
const { chargeCard } = require("../controller/card");

card.post("/charge-card", chargeCard);

module.exports = { card };
