const { subscription } = require("../models");

class SubscriptionRepository {
    async createSubscription(data) {
        const createSubscription = await subscription.create(data);

        return createSubscription;
    }
}

module.exports = { SubscriptionRepository };
