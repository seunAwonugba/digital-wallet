module.exports.CheckAccountBalance = (accountBalance, amount) => {
    try {
        return accountBalance < amount;
    } catch (error) {
        return error;
    }
};
