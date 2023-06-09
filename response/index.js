const { SubmitPin, SubmitOtp } = require("../payment-channel");

module.exports.HandleResponseStatus = async (
    status,
    ref,
    pin,
    otp,
    accountId,
    t
) => {
    switch (status) {
        case "send_pin":
            return await SubmitPin(ref, pin, otp, accountId, t);
        default:
            break;
    }
};
