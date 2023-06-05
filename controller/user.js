const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../service/user-service");

const userService = new UserService();

const createUser = async (req, res, next) => {
    try {
        const createUser = await userService.createUser(req.body);
        return res.status(StatusCodes.CREATED).json(createUser);
    } catch (error) {
        next(error);
    }
};

module.exports = { createUser };
