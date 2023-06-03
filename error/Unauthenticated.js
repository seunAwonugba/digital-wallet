const { CustomErrorHandler } = require("./CustomErrorHandler");
const { StatusCodes } = require("http-status-codes");

class Unauthenticated extends CustomErrorHandler {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = { Unauthenticated };
