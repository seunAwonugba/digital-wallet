require("dotenv").config();
const { createClient } = require("redis");

const getOrSetCache = async (accountId, hash) => {
    const client = createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        },
        url: process.env.REDIS_URL,
    });

    client.on("error", (err) => console.log("Redis client error", err));

    await client.connect();

    const getCache = await client.get(accountId);

    if (getCache) {
        return getCache == hash;
    }

    const setCache = await client.set(accountId, hash, { EX: 120 });

    return setCache;
};

module.exports = { getOrSetCache };
