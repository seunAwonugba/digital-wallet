const { BadRequest } = require("../error");
const { AccountRepository } = require("../repository/account-repository");

class AccountService {
    constructor() {
        this.accountRepository = new AccountRepository();
    }

    async findAccountById(id) {
        const account = await this.accountRepository.findAccountById(id);

        if (!account) {
            throw new BadRequest("Account not found");
        }

        return {
            success: true,
            data: account,
        };
    }

    //-value for reduction
    async increaseBalance(value, t, accountId) {
        const increaseBalance = await this.accountRepository.increaseBalance(
            value,
            t,
            accountId
        );

        // console.log(increaseBalance);

        return {
            success: true,
            data: increaseBalance,
        };
    }
}

module.exports = { AccountService };
