const express = require("express");
const { transfer } = require("../controller/transfer");
const transferRouter = express.Router();

transferRouter.post("/transfer-funds", transfer);

module.exports = { transferRouter };
