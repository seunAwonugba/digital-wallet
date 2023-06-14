const { request } = require("../request");

module.exports.CheckAccountBalance = (accountBalance, amount) => {
    try {
        return accountBalance < amount;
    } catch (error) {
        return error;
    }
};

module.exports.VerifyAccountDetails = async (accountNumber, bankCode) => {
    try {
        const response = await request.get(
            `/bank/resolve/?account_number=${accountNumber}&bank_code=${bankCode}`
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

module.exports.CreateTransferRecipient = async (
    type,
    name,
    accountNumber,
    bankCode,
    authorizationCode
) => {
    const body = {
        type,
        name,
        account_number: accountNumber,
        bank_code: bankCode,
        currency,
        authorization_code: authorizationCode,
    };
    try {
        const response = await request.post("/transferrecipient", body);
        return response.data;
    } catch (error) {
        return error;
    }
};
