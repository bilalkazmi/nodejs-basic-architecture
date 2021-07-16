const { JSONResponse } = require("../../utils");

/**
 * @function TestService
 * @description Returns a stringified object
 * @return {json} message 
 */
const TestService = () => {
    return (JSONResponse({message : `Status: OK`})); 
}

module.exports = TestService