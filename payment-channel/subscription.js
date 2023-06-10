require("dotenv").config();
const { BadRequest } = require("../error");
const { sequelize } = require("../models");
const { request } = require("../request");
const { SubscriptionService } = require("../service/subscription-service");
const { Card } = require("./card");

class Subscription {
    constructor() {
        this.subscriptionService = new SubscriptionService();
        this.card = new Card();
    }

    async subscribe(data, accountId) {
        const email = data.email;
        let plan;
        let amount;

        if (!email) {
            throw new BadRequest("Email address is required for subscription");
        }

        if (!data.plan) {
            throw new BadRequest("Kindly select a plan");
        }

        switch (data.plan) {
            case "monthly":
                plan = process.env.PAYSTACK_MONTHLY_CODE;
                amount = process.env.PAYSTACK_MONTHLY_AMOUNT;
                break;
            case "weekly":
                plan = process.env.PAYSTACK_WEEKLY_PLAN_CODE;
                amount = process.env.PAYSTACK_WEEKLY_AMOUNT;
                break;
            case "daily":
                plan = process.env.PAYSTACK_DAILY_PLAN_CODE;
                amount = process.env.PAYSTACK_DAILY_AMOUNT;
                break;
            default:
                break;
        }

        const body = {
            email,
            amount,
            plan,
        };

        try {
            const response = await request.post(
                "/transaction/initialize",
                body
            );

            if (!response.data.status) {
                return;
            }

            const cardNumber = data.card.number;
            const pin = data.card.pin;
            const cvv = data.card.cvv;
            const expiryMonth = data.card.expiry_month;
            const expiryYear = data.card.expiry_year;
            const otp = data.otp;
            const phone = data.phone;
            const birthday = data.phone;
            const address = data.phone;

            const chargeCard = await this.card.chargeCard({
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
            });

            console.log(chargeCard);

            return {
                success: true,
                data: chargeCard,
            };
        } catch (error) {
            console.log(error);
            if (error.response.data.data) {
                throw new BadRequest(error.response.data.data.message);
            }
            throw new BadRequest(error.response.data.message);
        }
    }
}

module.exports = { Subscription };
