const express = require("express");
const transaction = express.Router();
const { getTransactionByTransactionId } = require("../controller/transaction");

transaction.get(
    "/get-transaction-by-transaction-id",
    getTransactionByTransactionId
);

module.exports = { transaction };
