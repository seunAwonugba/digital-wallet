const { cardTransaction } = require("../models");

class CardTransactionRepository {
    async createCardTransaction({
        externalReference,
        lastResponse,
        amount,
        metadata,
        accountId,
        t,
    }) {
        const createCardTransaction = await cardTransaction.create(
            {
                externalReference,
                lastResponse,
                amount,
                metadata,
                accountId,
            },
            {
                transaction: t,
            }
        );

        return createCardTransaction;
    }
}

module.exports = { CardTransactionRepository };
