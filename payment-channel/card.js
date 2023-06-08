const { creditAccount } = require("../helper/transactions");
const { request } = require("../request");
const { sequelize } = require("../models");
const { SaveTransactionChannel } = require(".");
const { BadRequest } = require("../error");
const { HandleResponseStatus } = require("../response");
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
        otp,
        phone,
        birthday,
        address,
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

            const ref = response.data.data.reference;
            const status = response.data.data.status;
            console.log(response);

            if (status != "success") {
                const statusResponse = await HandleResponseStatus(
                    status,
                    ref,
                    body.card.pin,
                    accountId,
                    t
                );

                return statusResponse;
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
            // console.log(error.response);
            await t.rollback();
            if (error.response.data.data) {
                throw new BadRequest(error.response.data.data.message);
            }
            throw new BadRequest(error.response.data.message);
        }
    }
}

module.exports = { Card };
