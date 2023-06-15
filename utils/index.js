const { BadRequest } = require("../error");
const { request } = require("../request");

module.exports.CheckAccountBalance = (accountBalance, amount) => {
    try {
        return accountBalance < amount;
    } catch (error) {
        return error;
    }
};


