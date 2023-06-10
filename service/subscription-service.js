const {
    SubscriptionRepository,
} = require("../repository/subscription-repository");

class SubscriptionService {
    constructor() {
        this.subscriptionRepository = new SubscriptionRepository();
    }
    async createSubscription({
        email,
        plan,
        planId,
        subRef,
        metadata,
        userId,
        t,
    }) {
        const createSubscription =
            this.subscriptionRepository.createSubscription({
                email,
                plan,
                planId,
                subRef,
                metadata,
                userId,
                t,
            });

        return createSubscription;
    }
}

module.exports = { SubscriptionService };
