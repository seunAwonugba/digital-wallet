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
            otp,
        };

        const t = await sequelize.transaction();
        try {
            const response = await request.post("/charge", body);

            const ref = response.data.data.reference;
            const status = response.data.data.status;

            if (status != "success") {
                const statusResponse = await HandleResponseStatus(
                    status,
                    ref,
                    body.card.pin,
                    otp,
                    accountId,
                    t
                );

                return statusResponse;
            }

            const channel = response.data.data.channel;
            const externalReference = response.data.data.reference;
            const amount = response.data.data.amount;
            const lastResponse = response.data.data.gateway_response;

            const metadata = {
                ...response.data.data.metadata,
                ...response.data.data.authorization,
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
                lastResponse,
                amount,
                metadata,
                accountId,
                t
            );

            await t.commit();

            return credit;
        } catch (error) {
            await t.rollback();
            if (error.response.data.data) {
                throw new BadRequest(error.response.data.data.message);
            }
            throw new BadRequest(error.response.data.message);
        }
    }
}

module.exports = { Card };
