require("dotenv").config();
const { Subscribe } = require(".");
const { BadRequest } = require("../error");
const { sequelize } = require("../models");
const { request } = require("../request");
const { SubscriptionService } = require("../service/subscription-service");
const { TransactionService } = require("../service/transaction-service");
const { Card } = require("./card");

class Subscription {
    constructor() {
        this.subscriptionService = new SubscriptionService();
        this.card = new Card();
        this.transactionService = new TransactionService();
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

        const t = await sequelize.transaction();

        try {
            const checkFirstTimeUser =
                await this.transactionService.getTransactionByEmail(email);

            if (checkFirstTimeUser.data) {
                const body = {
                    amount,
                    customer: checkFirstTimeUser.data.paystackCustomerCode,
                    plan: planId,
                };

                const response = await request.post("/subscription", body);
                console.log(response);

                return response;
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
                amount: process.env.PAYSTACK_FIRST_TIME_CHARGE,
                accountId,
                otp,
                phone,
                birthday,
                address,
            });

            console.log(chargeCard);

            const newlyCharged =
                await this.transactionService.getTransactionByEmail(email);

            const subscribe = await Subscribe({
                amount,
                customer: newlyCharged.data.paystackCustomerCode,
                plan: planId,
            });

            const saveSubscription =
                await this.subscriptionService.createSubscription({
                    email,
                    plan: planName,
                    planId,
                    subscriptionCode: subscribe.data.subscription_code,
                    nextPaymentDate: subscribe.data.next_payment_date,
                    status: subscribe.data.status,
                    userId,
                    t,
                });

            //remember to revert users money

            await t.commit();

            return {
                success: true,
                data: saveSubscription,
            };
        } catch (error) {
            await t.rollback();
            console.log(error);
            throw new BadRequest(error);
        }
    }
}

module.exports = { Subscription };
