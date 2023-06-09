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
}

module.exports = { TransactionRepository };
