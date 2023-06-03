const {
    CardTransactionRepository,
} = require("../repository/card-transaction-repository");

class CardTransactionService {
    constructor() {
        this.cardTransactionRepository = new CardTransactionRepository();
    }

    async createCardTransaction({
        externalReference,
        lastResponse,
        amount,
        metadata,
        accountId,
        t,
    }) {
        const createCardTransaction =
            await this.cardTransactionRepository.createCardTransaction({
                externalReference,
                lastResponse,
                amount,
                metadata,
                accountId,
                t,
            });

        return {
            success: true,
            data: createCardTransaction,
        };
    }
}

module.exports = { CardTransactionService };
