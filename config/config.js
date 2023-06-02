require("dotenv").config();
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DEV_DB,
        host: process.env.DB_HOST,
        dialect: process.env.DB_dialect,
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.TEST_DB,
        host: process.env.DB_HOST,
        dialect: process.env.DB_dialect,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.PROD_DB,
        host: process.env.DB_HOST,
        dialect: process.env.DB_dialect,
    },
};
