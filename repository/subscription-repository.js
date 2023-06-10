const { subscription } = require("../models");

class SubscriptionRepository {
    async createSubscription({
        email,
        plan,
        planId,
        subRef,
        metadata,
        userId,
        t,
    }) {
        const createSubscription = await subscription.create(
            {
                email,
                plan,
                planId,
                subscriptionReference: subRef,
                metadata,
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
