const { RedisClient } = require("redis");
const logger = require("../logger");
const util = require('util');


/**
 * @function initiateSocketServer
 * @description Initializes Socket IO Server
 * @param {Server} server 
 * @param {RedisClient} client
 */
const initiateSocketServer = (http, client) => {
    const io = require('socket.io')(http);
    let setRedis = util.promisify(client.set).bind(client);
    let getRedis = util.promisify(client.get).bind(client);
    io.on('connection', (socket) => {
        logger.debugger(`Socket Server Initialized.`);
        socket.on('disconnect', () => {
            logger.debugger(`Socket Server Disconnected.`);
        });

        socket.on('join-room', async data => {
            logger.debugger(`User Joined : ${socket.id}`);
            let newUser = { username: data.username, room: data.room };
            await setRedis(socket.id, JSON.stringify(newUser));
            socket.emit('send-data', { id: socket.id, username: newUser.username, room: newUser.room });
            socket.join(newUser.room);
        });

        socket.on('chat-message', async data => {
            const room = data.room || JSON.parse(await getRedis(socket.id)).room;
            logger.debugger(`Message Received : ${socket.id} | Room : ${room}`);
            io.to(room).emit('chat-message', { data, id: socket.id });
        });
    });
    return io;
}

module.exports = initiateSocketServer;