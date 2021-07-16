const routes = require("./routes.json").routes;
const controllers = require("./controllers/index");

/**
 * @function handleRoutes
 * @description Calls the corresponding `controller` matching the route `url`
 * @param {Request} req 
 * @param {Response} res 
 */
const handleRoutes = (req, res, client) => {
    routes.map((route) => {
        if (route.url === req.path && route.method === req.method) {
            controllers[route.controller](req, res, client);
        }
        else {
            res.status(404).send("Endpoint doesn't exists.");
        }
    })
}

module.exports = handleRoutes;