const { StatusCodes } = require("http-status-codes");
const { Card } = require("../payment-channel/card");

const chargeCard = async (req, res, next) => {
    try {
        const card = new Card(); // Instantiate the Card class

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
        return res.status(StatusCodes.OK).json(chargeCard);
    } catch (error) {
        next(error);
    }
};

module.exports = { chargeCard };
