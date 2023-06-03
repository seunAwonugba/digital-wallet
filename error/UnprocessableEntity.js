const { CustomErrorHandler } = require("./CustomErrorHandler");
const { StatusCodes } = require("http-status-codes");

class UnprocessableEntity extends CustomErrorHandler {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    }
}

module.exports = { UnprocessableEntity };
