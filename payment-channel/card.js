const { creditAccount } = require("../helper/transactions");
const { request } = require("../request");
const { sequelize } = require("../models");
require("dotenv").config();
class Card {
    async chargeCard({
        cardNumber,
        cvv,
        expiryMonth,
        expiryYear,
        pin,
        email,
        amount,
        accountId,
    }) {
        const body = {
            email,
            amount,
            card: {
                number: cardNumber,
                cvv,
                pin,
                expiry_month: expiryMonth,
                expiry_year: expiryYear,
            },
        };
        const t = await sequelize.transaction();
        try {
            const response = await request.post("/charge", body);
            console.log(response);

            if (response.data.data.status === false) {
                console.log(response.data.data.message);
            }

            await creditAccount({
                action: "card_funding",
                amount,
                accountId,
                metadata: {
                    ...response.data.data.metadata,
                    transactionReference: response.data.data.reference,
                    transactionStatus: response.data.data.status,
                    gatewayResponse: response.data.data.gateway_response,
                    channel: response.data.data.channel,
                    currency: response.data.data.currency,
                    ipAddress: response.data.data.ip_address,
                    cardType: response.data.data.authorization.card_type,
                    bank: response.data.data.authorization.bank,
                    brand: response.data.data.authorization.brand,
                    signature: response.data.data.authorization.signature,
                },
                t,
            });
        } catch (error) {
            return error;
        }
    }
}

module.exports = { Card };
