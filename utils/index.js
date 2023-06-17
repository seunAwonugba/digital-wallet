const { v4: uuidv4 } = require("uuid");
module.exports.CheckAccountBalance = (accountBalance, amount) => {
    try {
        return accountBalance > amount;
    } catch (error) {
        return error;
    }
};

module.exports.GenerateUUID4 = () => {
    return uuidv4();
};
