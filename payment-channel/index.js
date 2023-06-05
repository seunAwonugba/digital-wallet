const { creditAccount } = require("../helper/transactions");
const { request } = require("../request");
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
        case "card":
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

module.exports.SubmitPin = async (ref, pin, accountId, t) => {
    const payload = {
        pin,
        reference: ref,
    };
    try {
        const response = await request.post("/charge/submit_pin", payload);
        const channel = response.data.data.channel;
        const externalReference = response.data.data.reference;
        const amount = response.data.data.amount;

        const metadata = {
            ...response.data.data.metadata,
            transactionReference: externalReference,
            transactionStatus: response.data.data.status,
            gatewayResponse: response.data.data.gateway_response,
            channel,
            currency: response.data.data.currency,
            ipAddress: response.data.data.ip_address,
            cardType: response.data.data.authorization.card_type,
            bank: response.data.data.authorization.bank,
            brand: response.data.data.authorization.brand,
            signature: response.data.data.authorization.signature,
        };

        const credit = await creditAccount({
            action: "card_funding_with_pin",
            amount,
            accountId,
            metadata,
            t,
        });

        await this.SaveTransactionChannel(
            channel,
            externalReference,
            "",
            amount,
            metadata,
            accountId
        );

        await t.commit();
        return credit;
    } catch (error) {
        await t.rollback();
        return error.response.data.data.message;
    }
};
