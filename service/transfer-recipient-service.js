const {
    TransferRecipientRepository,
} = require("../repository/transfer-recipient-repository");

class TransferRecipientService {
    constructor() {
        this.transferRecipientRepository = new TransferRecipientRepository();
    }
    async createTransferRecipient(data) {
        const createTransferRecipient =
            await this.transferRecipientRepository.createTransferRecipient(
                data
            );

        return createTransferRecipient;
    }
}

module.exports = { TransferRecipientService };