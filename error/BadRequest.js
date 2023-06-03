const { CustomErrorHandler } = require("./CustomErrorHandler");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends CustomErrorHandler {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = { BadRequest };
