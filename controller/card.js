const { Card } = require("../payment-channel/card");

const card = new Card();
const chargeCard = async (req, res, next) => {
    try {
        const chargeCard = await card.chargeCard({
            cardNumber: req.body.card.number,
            cvv: req.body.card.cvv,
            expiryMonth: req.body.card.expiry_month,
            expiryYear: req.body.card.expiry_year,
            pin: req.body.card.pin,
            email: req.body.email,
            amount: req.body.amount,
            accountId: 1,
        });
        return chargeCard;
    } catch (error) {
        next();
    }
};

module.exports = { chargeCard };
