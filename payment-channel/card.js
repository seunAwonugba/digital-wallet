const { creditAccount } = require("../helper/transactions");
const { request } = require("../request");
const { sequelize } = require("../models");
const { SaveTransactionChannel } = require(".");
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

            if (response.data.data.status === false) {
                console.log(response.data.data.message);
            }

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
                action: "card_funding",
                amount,
                accountId,
                metadata,
                t,
            });

            // console.log(credit);

            await SaveTransactionChannel(
                channel,
                externalReference,
                "",
                amount,
                metadata,
                accountId,
                t
            );

            await t.commit();

            return credit;
        } catch (error) {
            console.log(error);
            await t.rollback();
            return error;
        }
    }
}

module.exports = { Card };
