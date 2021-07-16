const { httpRequest } = require("../../utils");

/**
 * @function GetAdhanTimings
 * @description Fetches Adhan timings from Aladhan API and returns the Response in JSON format
 * @return {json} data
 */
const GetAdhanTimings = async (city, country, method = 0) => {
    const params = {
        method: `GET`
    };
    const url = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;
    const res = await httpRequest(url, params);
    return { message: "Successfully fetched Adhan Timings.", data: res.data, status: res.code };
}



module.exports = { GetAdhanTimings };