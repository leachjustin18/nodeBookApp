var mongoose = require('mongoose');

var connection = mongoose.createConnection('localhost/pluraldb');

var Schema = mongoose.Schema;

var bookSchema = new Schema({
    cat: Array,
    name: String,
    author: String,
    read: Boolean,
    bookId: Number,
    price: Number,
    img: String
});

module.exports = connection.model('Books', bookSchema);
