const { transaction } = require("../models");

class TransactionRepository {
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
        const createTransaction = await transaction.create(
            {
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
            },
            {
                transaction: t,
                lock: t.LOCK.UPDATE,
            }
        );

        return createTransaction;
    }

    async getTransactionByTransactionId(transactionId) {
        const getTransaction = await transaction.findByPk(transactionId);

        return getTransaction;
    }

    async getTransactionByEmail(email) {
        const getTransaction = await transaction.findOne({
            where: {
                email,
            },
        });

        return getTransaction;
    }
}

module.exports = { TransactionRepository };
