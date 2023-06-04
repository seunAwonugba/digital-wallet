const { CustomErrorHandler } = require("../error");
const { StatusCodes } = require("http-status-codes");

const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomErrorHandler) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(StatusCodes.CONFLICT).json({
            success: false,
            data: err.errors[0].message,
        });
    }

    if (err.isJoi == true) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            data: err.details[0].message,
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: err.message.split(":")[2] || "Unknown error occurred",
    });
};

module.exports = { errorMiddleware };
