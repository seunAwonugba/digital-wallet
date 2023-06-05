const express = require("express");
const { createUser } = require("../controller/user");
const user = express.Router();

user.post("/create-user", createUser);

module.exports = { user };
