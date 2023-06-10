const { subscription } = require("../models");

class SubscriptionRepository {
    async createSubscription({
        email,
        plan,
        planId,
        subscriptionCode,
        nextPaymentDate,
        status,
        userId,
        t,
    }) {
        const createSubscription = await subscription.create(
            {
                email,
                plan,
                planId,
                subscriptionCode,
                nextPaymentDate,
                status,
                userId,
            },
            {
                transaction: t,
            }
        );

        return createSubscription;
    }
}

module.exports = { SubscriptionRepository };
