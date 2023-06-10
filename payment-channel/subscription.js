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

    async subscribe(data, accountId, userId) {
        const email = data.email;
        const planName = data.plan;
        let planId;
        let amount;

        if (!email) {
            throw new BadRequest("Email address is required for subscription");
        }

        if (!planName) {
            throw new BadRequest("Kindly select a plan");
        }

        switch (planName) {
            case "monthly":
                planId = process.env.PAYSTACK_MONTHLY_CODE;
                amount = process.env.PAYSTACK_MONTHLY_AMOUNT;
                break;
            case "weekly":
                planId = process.env.PAYSTACK_WEEKLY_PLAN_CODE;
                amount = process.env.PAYSTACK_WEEKLY_AMOUNT;
                break;
            case "daily":
                planId = process.env.PAYSTACK_DAILY_PLAN_CODE;
                amount = process.env.PAYSTACK_DAILY_AMOUNT;
                break;
            default:
                break;
        }

        const body = {
            email,
            amount,
            plan: planId,
        };

        const t = await sequelize.transaction();

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

            //amount ignores the body value uses sub value
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

            const subscribe = await this.subscriptionService.createSubscription(
                {
                    email,
                    plan: planName,
                    planId,
                    subRef: response.data.data.reference,
                    metadata: chargeCard.data.metadata,
                    userId,
                    t,
                }
            );

            await t.commit();

            return {
                success: true,
                data: subscribe,
            };
        } catch (error) {
            await t.rollback();
            throw new BadRequest(error);
        }
    }
}

module.exports = { Subscription };
