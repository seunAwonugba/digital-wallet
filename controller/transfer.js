const { StatusCodes } = require("http-status-codes");
const { Transfer } = require("../payment-channel/transfer");

const transfer = async (req, res, next) => {
    const transfer = new Transfer();
    const { accountNumber, bankCode, type, reason, amount } = req.body;

    try {
        const transferFunds = await transfer.transfer(accountNumber, bankCode, type, req.query.accountId, reason, amount);
        return res.status(StatusCodes.OK).json(transferFunds);
    } catch (error) {
        next(error);
    }
};

module.exports = { transfer };
