const {
    VerifyAccountDetails,
    CreateTransferRecipient,
    InitiateTransfer,
} = require(".");
const { debitAccount } = require("../helper/transactions");
const { sequelize } = require("../models");
const {
    TransferRecipientService,
} = require("../service/transfer-recipient-service");
const { GenerateUUID4 } = require("../utils");

class Transfer {
    constructor() {
        this.transferRecipientService = new TransferRecipientService();
    }
    async transfer(accountNumber, bankCode, type, accountId, reason, amount) {
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

        const reference = GenerateUUID4();
        // console.log(reference);

        const t = await sequelize.transaction();

        try {
            const createDebit = await debitAccount({
                action: "debit_from_balance",
                amount,
                accountId,
                metadata: createTransferRecipient.data.details,
                t,
                reference,
            });

            await t.commit();
            return createDebit;
        } catch (error) {
            await t.rollback();
            console.log(error);
        }

        // const transfer = await InitiateTransfer(
        //     amount,
        //     reference,
        //     createTransferRecipient.data.recipient_code,
        //     reason
        // );

        // const transferRecipient = this.transferRecipientService.createTransferRecipient()
    }
}

module.exports = { Transfer };
