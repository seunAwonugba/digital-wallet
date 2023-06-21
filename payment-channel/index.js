const { BadRequest } = require("../error");
const { creditAccount } = require("../helper/transactions");
const { request } = require("../request");
const {
    CardTransactionService,
} = require("../service/card-transaction-service");

const cardTransactionService = new CardTransactionService();

module.exports.SaveTransactionChannel = async (
    channel,
    externalReference,
    lastResponse,
    amount,
    metadata,
    accountId,
    t
) => {
    switch (channel) {
        case "card":
            await cardTransactionService.createCardTransaction({
                externalReference,
                lastResponse,
                amount,
                metadata,
                accountId,
                t,
            });

            break;

        default:
            break;
    }
};

module.exports.SubmitPin = async (ref, pin, otp, accountId, t) => {
    const payload = {
        pin,
        reference: ref,
    };
    try {
        const response = await request.post("/charge/submit_pin", payload);
        const status = response.data.data.status;

        if (status == "send_otp") {
            return this.SubmitOtp(otp, ref, accountId, t);
        }

        const channel = response.data.data.channel;
        const externalReference = response.data.data.reference;
        const amount = response.data.data.amount;
        const lastResponse = response.data.data.gateway_response;

        const metadata = {
            ...response.data.data.metadata,
            ...response.data.data.authorization,
        };

        const credit = await creditAccount({
            action: "card_funding_with_pin",
            amount,
            accountId,
            metadata,
            t,
            email: response.data.data.customer.email,
            paystackCustomerCode: response.data.data.customer.customer_code,
        });

        await this.SaveTransactionChannel(
            channel,
            externalReference,
            lastResponse,
            amount,
            metadata,
            accountId
        );

        await t.commit();
        return credit;
    } catch (error) {
        await t.rollback();
        if (error.response && error.response.data && error.response.data.data) {
            // Handle error response with data
            throw new BadRequest(error.response.data.data.message);
        } else if (error.response && error.response.data) {
            // Handle error response without data
            throw new BadRequest(error.response.data.message);
        } else {
            // Handle other errors
            throw new BadRequest(
                "An error occurred during the charge card process with pin"
            );
        }
    }
};

module.exports.SubmitOtp = async (otp, ref, accountId, t) => {
    const payload = {
        otp,
        reference: ref,
    };

    try {
        const response = await request.post("/charge/submit_otp", payload);
        const externalReference = response.data.data.reference;
        const amount = response.data.data.amount;
        const channel = response.data.data.channel;
        const lastResponse = response.data.data.gateway_response;

        const metadata = {
            ...response.data.data.metadata,
            ...response.data.data.authorization,
        };

        const credit = await creditAccount({
            action: "card_funding_with_otp",
            amount,
            accountId,
            metadata,
            t,
            email: response.data.data.customer.email,
            paystackCustomerCode: response.data.data.customer.customer_code,
        });

        await this.SaveTransactionChannel(
            channel,
            externalReference,
            lastResponse,
            amount,
            metadata,
            accountId,
            t
        );

        await t.commit();
        return credit;
    } catch (error) {
        await t.rollback();
        if (error.response && error.response.data && error.response.data.data) {
            // Handle error response with data
            throw new BadRequest(error.response.data.data.message);
        } else if (error.response && error.response.data) {
            // Handle error response without data
            throw new BadRequest(error.response.data.message);
        } else {
            // Handle other errors
            throw new BadRequest(
                "An error occurred during the charge card process with otp"
            );
        }
    }
};

module.exports.Subscribe = async (body) => {
    try {
        const response = await request.post("/subscription", body);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.data) {
            // Handle error response with data
            throw new BadRequest(error.response.data.data.message);
        } else if (error.response && error.response.data) {
            // Handle error response without data
            throw new BadRequest(error.response.data.message);
        } else {
            // Handle other errors
            throw new BadRequest(
                "An error occurred during the charge card process"
            );
        }
    }
};

module.exports.VerifyAccountDetails = async (accountNumber, bankCode) => {
    try {
        const response = await request.get(
            `/bank/resolve/?account_number=${accountNumber}&bank_code=${bankCode}`
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.data) {
            // Handle error response with data
            throw new BadRequest(error.response.data.data.message);
        } else if (error.response && error.response.data) {
            // Handle error response without data
            throw new BadRequest(error.response.data.message);
        } else {
            // Handle other errors
            throw new BadRequest(
                "An error occurred during the charge card process"
            );
        }
    }
};

module.exports.CreateTransferRecipient = async (
    type,
    name,
    accountNumber,
    bankCode,
    currency,
    authorizationCode
) => {
    const body = {
        type,
        name,
        account_number: accountNumber,
        bank_code: bankCode,
        currency,
        authorization_code: authorizationCode,
    };
    try {
        const response = await request.post("/transferrecipient", body);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.data) {
            // Handle error response with data
            throw new BadRequest(error.response.data.data.message);
        } else if (error.response && error.response.data) {
            // Handle error response without data
            throw new BadRequest(error.response.data.message);
        } else {
            // Handle other errors
            throw new BadRequest(
                "An error occurred during the charge card process"
            );
        }
    }
};

module.exports.InitiateTransfer = async (
    amount,
    reference,
    recipient,
    reason
) => {
    const body = {
        source: "wallet balance",
        amount,
        reference,
        recipient,
        reason,
    };

    try {
        const response = await request.post("/transfer", body);
        return response.data;
    } catch (error) {
        console.log(error.response);
        if (error.response && error.response.data && error.response.data.data) {
            // Handle error response with data
            throw new BadRequest(error.response.data.data.message);
        } else if (error.response && error.response.data) {
            // Handle error response without data
            throw new BadRequest(error.response.data.message);
        } else {
            // Handle other errors
            throw new BadRequest(
                "An error occurred during the charge card process"
            );
        }
    }
};
