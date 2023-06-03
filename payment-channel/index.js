const {
    CardTransactionService,
} = require("../service/card-transaction-service");

const cardTransactionService = new CardTransactionService();

module.exports.SaveTransactionChannel = async (
    channel,
    externalReference,
    lastResponse,
    amount,
    metadata,
    accountId,
    t
) => {
    switch (channel) {
        case card:
            await cardTransactionService.createCardTransaction({
                externalReference,
                lastResponse,
                amount,
                metadata,
                accountId,
                t,
            });

            break;

        default:
            break;
    }
};
