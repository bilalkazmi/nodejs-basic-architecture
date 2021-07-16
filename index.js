require('dotenv').config();
require('./mongoose/index');
const http = require('http');
const handleRoutes = require('./handle-routes');
const logger = require('./logger');
const initiateSocketServer = require('./socket');
const { JSONResponse } = require('./utils');
const express = require('express');
const initiateRedisClient = require('./redis');
const client = initiateRedisClient();

const app = express();
const server = http.createServer(app);
const hostname = 'localhost';
const port = 3000;

app.use(express.static('public'));
app.use((req, res) => {
    try{
        logger.mainLogger(req);
        handleRoutes(req, res, client);
    }
    catch (err) {
        return (JSONResponse({ message: err, data: null, status: 500 }));
    }
});

const socketServer = initiateSocketServer(http, client);
socketServer.listen(server);



server.listen(port, hostname, () => {
  logger.debuggerLocal(`Server running at http://${hostname}:${port}`);
});

server.once('close', () => {
  logger.debuggerLocal(`Server Shutdown`);
  logger.debugger(`Server Shutdown`);
  logger.debugger(`Closing Socket IO Server..`);
  return socketServer.close((error) => {
    if (error) {
      logger.error(`Failed Closing Socket Server | Error: ${error}`);
      return;
    }
    logger.debugger(`Closed Socket IO Server.`);
    socketServer.removeAllListeners();
    return;
  });
});

process.on('SIGINT', () => {
  server.close();
});