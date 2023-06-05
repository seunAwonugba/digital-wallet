const { account } = require("../models");

class AccountRepository {
    async findAccountById(id) {
        const findAccount = await account.findByPk(id);

        return findAccount;
    }

    async increaseBalance(value, t, accountId) {
        const increaseBalance = await account.increment("balance", {
            by: value,
            transaction: t,
            where: {
                id: accountId,
            },
        });

        return increaseBalance;
    }

    async createAccount(userId) {
        const createAccount = await account.create({
            userId,
        });

        return createAccount;
    }
}

module.exports = { AccountRepository };
