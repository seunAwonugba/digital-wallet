const { StatusCodes } = require("http-status-codes");
const { Subscription } = require("../payment-channel/subscription");

const subscribe = async (req, res, next) => {
    const subscription = new Subscription();
    try {
        const subscribe = await subscription.subscribe(
            req.body,
            req.query.accountId,
            req.query.userId
        );

        return res.status(StatusCodes.CREATED).json(subscribe);
    } catch (error) {
        next(error);
    }
};

module.exports = { subscribe };
