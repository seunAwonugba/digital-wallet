const express = require("express");
const { webhook } = require("../controller/webhook");
const webhookRouter = express.Router();

webhookRouter.post("/", webhook);

module.exports = { webhookRouter };
