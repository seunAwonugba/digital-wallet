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
                email: response.data.data.customer.email,
                paystackCustomerCode: response.data.data.customer.customer_code,
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
            if (
                error.response &&
                error.response.data &&
                error.response.data.data
            ) {
                // Handle error response with data
                throw new BadRequest(error.response.data.data.message);
            } else if (error.response && error.response.data) {
                // Handle error response without data
                throw new BadRequest(error.response.data.message);
            } else {
                // Handle other errors
                throw new BadRequest(
                    "An error occurred during the charge card process"
                );
            }
        }
    }
}

module.exports = { Card };
