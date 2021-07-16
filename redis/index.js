const redis = require("redis");
const { RedisClient } = require("redis");

const redisPort = process.env.REDIS_PORT || 6379;

/**
 * @function initiateRedisClient
 * @description Initializes Redis Client
 * @return {RedisClient} 
 */
const initiateRedisClient = () => {
    const client = redis.createClient(redisPort);
    client.on("error", (err) => {
        logger.error(err);
    });
    return client;
}

module.exports = initiateRedisClient