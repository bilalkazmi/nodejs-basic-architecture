const mongoose = require('mongoose');

const schema = {
    username: 'string',
    password: 'string',
    fullname: 'string'
}

const userSchema = new mongoose.Schema(schema);
const User = mongoose.model('User', userSchema);
module.exports = User;