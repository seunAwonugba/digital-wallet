const {
    SubscriptionRepository,
} = require("../repository/subscription-repository");

class SubscriptionService {
    constructor() {
        this.subscriptionRepository = new SubscriptionRepository();
    }
    async createSubscription(data) {
        const createSubscription =
            this.subscriptionRepository.createSubscription(data);

        return createSubscription;
    }
}

module.exports = { SubscriptionService };
