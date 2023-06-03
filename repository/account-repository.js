const { account } = require("../models");

class AccountRepository {
    async createAccount() {}

    async findAccountById(id) {
        const findAccount = await account.findByPk(id);

        return findAccount;
    }

    async increaseBalance(value, t) {
        const increaseBalance = await account.increment("balance", {
            by: value,
            transaction: t,
        });

        return increaseBalance;
    }
}

module.exports = { AccountRepository };
