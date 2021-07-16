const TestService = require("./test_service");

/**
 * @function TestController
 * @description Test controller that runs on index api route
 * @param {Request} req 
 * @param {Response} res 
 */
const TestController = (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(TestService()); 
}

module.exports = TestController

