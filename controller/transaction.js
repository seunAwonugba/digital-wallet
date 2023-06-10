const { StatusCodes } = require("http-status-codes");
const { TransactionService } = require("../service/transaction-service");

const getTransactionByTransactionId = async (req, res, next) => {
    const transactionService = new TransactionService();
    try {
        const getTransaction =
            await transactionService.getTransactionByTransactionId(
                req.query.transactionId
            );

        return res.status(StatusCodes.OK).json(getTransaction);
    } catch (error) {
        next(error);
    }
};

module.exports = { getTransactionByTransactionId };
