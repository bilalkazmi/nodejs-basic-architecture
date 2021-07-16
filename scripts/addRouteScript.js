const fs = require('fs');
const logger = require("../logger");
const routes = require("../routes.json").routes;

const addRoute = (url, controller, method) => {    
  return new Promise((resolve, reject) => {
    routes.push({url, controller, method})    
    fs.writeFile('routes.json', JSON.stringify({ routes: routes }), (err) => {
        if (err) reject(err);
        resolve("File saved.");
        logger.debugger(`Route is successfully created.`);
    })
  });
}

module.exports = { addRoute };