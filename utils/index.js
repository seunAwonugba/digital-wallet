const { v4: uuidv4 } = require("uuid");
const objectHash = require("object-hash");
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

module.exports.HashTransaction = (data) => {
    return objectHash(data);
};
