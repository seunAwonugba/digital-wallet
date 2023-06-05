const { AccountRepository } = require("../repository/account-repository");
const { UserRepository } = require("../repository/user-repository");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.accountRepository = new AccountRepository();
    }

    async createUser(data) {
        const createUser = await this.userRepository.createUser(data);

        const userId = createUser.id;

        await this.accountRepository.createAccount(userId);

        return {
            success: true,
            data: createUser,
        };
    }
}

module.exports = { UserService };
