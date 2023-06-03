require("dotenv").config();
const axios = require("axios").default;

const request = axios.create({
    baseURL: process.env.PAYSTACK_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
    },
});

module.exports = { request };
