const mongoose = require('mongoose');
const logger = require('../logger');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('error', (error) => {
    logger.error(`Database Error: ${error}`);
});

db.once('open', function() {
    logger.debugger(`Database successfully connected.`)
});