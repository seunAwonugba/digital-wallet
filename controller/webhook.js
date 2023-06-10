require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");

const webhook = async (req, res, next) => {
    try {
        const hash = crypto
            .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (!hash == req.headers["x-paystack-signature"]) {
            return;
        }
        // console.log(req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: req.body,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { webhook };
