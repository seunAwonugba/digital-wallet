const { BadRequest } = require("../error");
const {
    TransactionRepository,
} = require("../repository/transaction-repository");

class TransactionService {
    constructor() {
        this.transactionRepository = new TransactionRepository();
    }

    async createTransaction({
        transactionType,
        action,
        amount,
        accountId,
        reference,
        metadata,
        balanceBefore,
        balanceAfter,
        email,
        paystackCustomerCode,
        t,
    }) {
        if (!amount) {
            throw new BadRequest("Please provide amount to transact");
        }
        const createTransaction =
            await this.transactionRepository.createTransaction({
                transactionType,
                action,
                amount,
                accountId,
                reference,
                metadata,
                balanceBefore,
                balanceAfter,
                email,
                paystackCustomerCode,
                t,
            });

        return {
            success: true,
            data: createTransaction,
        };
    }

    async getTransactionByTransactionId(transactionId) {
        const getTransaction =
            await this.transactionRepository.getTransactionByTransactionId(
                transactionId
            );

        return {
            success: true,
            data: getTransaction,
        };
    }

    async getTransactionByEmail(email) {
        const getTransaction =
            await this.transactionRepository.getTransactionByEmail(email);

        return {
            success: true,
            data: getTransaction,
        };
    }
}

module.exports = { TransactionService };
