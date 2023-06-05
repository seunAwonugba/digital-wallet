const { SubmitPin } = require("../payment-channel");

module.exports.HandleResponseStatus = async (
    status,
    ref,
    pin,
    accountId,
    t
) => {
    switch (status) {
        case "send_pin":
            return await SubmitPin(ref, pin, accountId, t);

        default:
            break;
    }
};
