const express = require("express");
const { subscribe } = require("../controller/subscription");
const subscription = express.Router();

subscription.post("/subscribe", subscribe);

module.exports = { subscription };
