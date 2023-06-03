class CustomErrorHandler extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = { CustomErrorHandler };
