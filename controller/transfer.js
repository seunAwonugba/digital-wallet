const { StatusCodes } = require("http-status-codes");
const { Transfer } = require("../payment-channel/transfer");

const transfer = async (req, res, next) => {
    const transfer = new Transfer();
    const { accountNumber, bankCode, type } = req.body;

    try {
        const transferFunds = await transfer.transfer(accountNumber, bankCode, type);
        return res.status(StatusCodes.OK).json(transferFunds);
    } catch (error) {
        next(error);
    }
};

module.exports = { transfer };
