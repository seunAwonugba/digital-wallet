require("dotenv").config();
const { createClient } = require("redis");

const getOrSetCache = async (accountId, hash) => {
    const client = createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        },
    });

    client.on("error", (err) => console.log("Redis client error", err));

    await client.connect();

    await client.sAdd(accountId, hash, (err, result) => {
        if (err) {
            return err;
        } else if (!result) {
            return false;
        } else if (result) {
            return true;
        }
        console.log(`Result -> ${result}`);
    });
    await client.expire(accountId, 120);
};

module.exports = { getOrSetCache };
