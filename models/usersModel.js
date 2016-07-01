var mongoose = require('mongoose');

var connection = mongoose.createConnection('localhost/pluraldb');

var Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: String,
    password: String
});

module.exports = connection.model('Users', usersSchema);