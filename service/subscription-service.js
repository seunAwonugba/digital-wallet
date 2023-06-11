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
        amount,
        subscriptionCode,
        nextPaymentDate,
        status,
        userId,
        t,
    }) {
        const createSubscription =
            this.subscriptionRepository.createSubscription({
                email,
                plan,
                planId,
                amount,
                subscriptionCode,
                nextPaymentDate,
                status,
                userId,
                t,
            });

        return createSubscription;
    }
}

module.exports = { SubscriptionService };
