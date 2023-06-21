const { v4 } = require("uuid");
const { AccountService } = require("../service/account-service");
const { TransactionService } = require("../service/transaction-service");
const { CheckAccountBalance } = require("../utils");

const accountService = new AccountService();
const transactionService = new TransactionService();

async function creditAccount({
    action,
    amount,
    accountId,
    metadata,
    t,
    email,
    paystackCustomerCode,
}) {
    const account = await accountService.findAccountById(accountId);

    await accountService.increaseBalance(amount, t, accountId);

    const transaction = await transactionService.createTransaction({
        transactionType: "credit",
        action,
        amount,
        accountId: account.data.id,
        reference: v4(),
        metadata,
        balanceBefore: Number(account.data.balance),
        balanceAfter: Number(account.data.balance) + Number(amount),
        email,
        paystackCustomerCode,
        t,
    });

    return transaction;
}

async function debitAccount({
    action,
    amount,
    accountId,
    metadata,
    t,
    reference,
}) {
    const account = await accountService.findAccountById(accountId);

    const checkAccountBalance = CheckAccountBalance(
        account.data.balance,
        amount
    );

    //if CheckAccountBalance returns false
    if (!checkAccountBalance) {
        return {
            success: false,
            data: "Insufficient balance",
        };
    }

    await accountService.increaseBalance(-amount, t, accountId);

    const transaction = await transactionService.createTransaction({
        transactionType: "debit",
        action,
        amount,
        accountId: account.data.id,
        reference,
        metadata,
        balanceBefore: Number(account.data.balance),
        balanceAfter: Number(account.data.balance) - Number(amount),
        email: "n/a",
        paystackCustomerCode: "n/a",
        t,
    });

    return transaction;
}

module.exports = { creditAccount, debitAccount };
