const { GetAdhanTimings } = require("./adhan_timing_service");
const { RedisClient } = require("redis");
const logger = require("../../logger");

/**
 * @function GetAdhanTimingsController
 * @description Returns the Adhan timings data
 * @param {Request} req 
 * @param {Response} res 
 * @param {RedisClient} client
 */
const GetAdhanTimingsController = async (req, res, client) => {
    const queryParams = req.params;
    client.get(JSON.stringify(queryParams), async (err, responseBody) => {
        if (err) throw err;
        if (responseBody) {
            responseBody = JSON.parse(responseBody);
            logger.debugger(`Result from cache: ${JSON.stringify(responseBody)}`);
        }
        else {
            const responseBody = await GetAdhanTimings(queryParams.city, queryParams.country, queryParams.method);
            client.setex(JSON.stringify(queryParams), 600, JSON.stringify(responseBody));
        }
        res.status(200).json(responseBody);
    })
}

module.exports = { GetAdhanTimingsController }