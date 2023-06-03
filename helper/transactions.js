const { v4 } = require("uuid");
const { AccountService } = require("../service/account-service");
const { TransactionService } = require("../service/transaction-service");

const accountService = new AccountService();
const transactionService = new TransactionService();

async function creditAccount({
    action,
    amount,
    accountId,
    reference = v4(),
    metadata,
    t,
}) {
    const account = await accountService.findAccountById(accountId);

    await accountService.increaseBalance(amount, t);

    const transaction = await transactionService.createTransaction({
        transactionType: "credit",
        action,
        amount,
        accountId: account.data.id,
        reference,
        metadata,
        balanceBefore: Number(account.data.balance),
        balanceAfter: Number(account.data.balance) + Number(amount),
        t,
    });

    return {
        success: true,
        data: transaction,
    };
}
async function debitAccount() {}

module.exports = { creditAccount, debitAccount };
