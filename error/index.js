const { CustomErrorHandler } = require("./CustomErrorHandler");
const { BadRequest } = require("./BadRequest");
const { Unauthenticated } = require("./Unauthenticated");
const { NotFound } = require("./NotFound");
const { UnprocessableEntity } = require("./UnprocessableEntity");

module.exports = {
    CustomErrorHandler,
    BadRequest,
    Unauthenticated,
    NotFound,
    UnprocessableEntity,
};
