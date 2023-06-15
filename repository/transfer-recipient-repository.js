const { transferrecipient } = require("../models");

class TransferRecipientRepository {
    async createTransferRecipient(data) {
        const createTransferRecipient = await transferrecipient.create(data);

        return createTransferRecipient;
    }
}

module.exports = { TransferRecipientRepository };
