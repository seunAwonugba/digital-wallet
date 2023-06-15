const { VerifyAccountDetails, CreateTransferRecipient } = require(".");
const {
    TransferRecipientService,
} = require("../service/transfer-recipient-service");

class Transfer {
    constructor() {
        this.transferRecipientService = new TransferRecipientService();
    }
    async transfer(accountNumber, bankCode, type) {
        const verifyAccount = await VerifyAccountDetails(
            accountNumber,
            bankCode
        );

        const name = verifyAccount.data.account_name;
        let currency;

        switch (type) {
            case "nuban":
                currency = "NGN";
                break;
            case "mobile_money":
                currency = "GHS";
                break;
            case "basa":
                currency = "ZAR";
                break;
            default:
                break;
        }

        const createTransferRecipient = await CreateTransferRecipient(
            type,
            name,
            accountNumber,
            bankCode,
            currency
        );

        const data = {
            
        }

        const transferRecipient = this.transferRecipientService.createTransferRecipient()

        return createTransferRecipient;
    }
}

module.exports = { Transfer };
