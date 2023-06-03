const { BadRequest } = require("../error");
const { AccountRepository } = require("../repository/account-repository");

class AccountService {
    constructor() {
        this.accountRepository = new AccountRepository();
    }

    async findAccountById(id) {
        const account = this.accountRepository.findAccountById(id);

        if (!account) {
            throw new BadRequest("Account not found");
        }

        return {
            success: true,
            data: account,
        };
    }

    //-value for reduction
    async increaseBalance(value, t) {
        const increaseBalance = this.accountRepository.increaseBalance(
            value,
            t
        );

        return {
            success: true,
            data: increaseBalance,
        };
    }
}

module.exports = { AccountService };
