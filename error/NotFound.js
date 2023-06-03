const { CustomErrorHandler } = require("./CustomErrorHandler");
const { StatusCodes } = require("http-status-codes");

class NotFound extends CustomErrorHandler {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = { NotFound };
