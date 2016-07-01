const express = require('express');

var adminRouter = express.Router();

var mongoose = require('mongoose');

var dbConfig = require('../db.config');

  
  var booksArray = [{
        "cat": ["book", "hardcover"],
        "name": "The Lightning Thief",
        "author": "Rick Riordan",
        "read": false,
        "bookId": 28187,
        "price": 12.50,
        "img": "img/lightningTheif.jpg"
    
    }, {
        "cat": ["book", "paperback"],
        "name": "The Sea of Monsters",
        "author": "Rick Riordan",
        "read": false,
        "bookId": 28186,
        "price": 6.49,
        "img": "img/seaMonsters.jpg"

    }, {
        "cat": ["book", "paperback"],
        "name": "Sophie's World : The Greek Philosophers",
        "author": "Jostein Gaarder",
        "read": false,
        "bookId": 58302,
        "price": 3.07,
        "img": "img/sophieWorld.jpg"
    }, {
        "cat": ["book", "paperback"],
        "name": "Lucene in Action, Second Edition",
        "author": "Michael McCandless",
        "read": false,
        "bookId": 22131010,
        "price": 30.50,
        "img": "img/lucene.jpg"
    }];

    var Schema = mongoose.Schema;

var bookSchema = new Schema({
    _id: Schema.Types.ObjectId,
    cat: Array,
    name: String,
    author: String,
    read: Boolean,
    price: Number
});

var BookModel = mongoose.model('Books', bookSchema);


var router = (nav) => {

    adminRouter.route('/addBooks')
        .get((req, res) => {

            //mongoose.connect(dbConfig.database);

            BookModel.collection.insert(booksArray, onInsert);

            function onInsert(err, docs) {
                if (err) {
                    return console.log('err ' + err)
                }

                return console.log(res.send = docs)
            }
        });

    return adminRouter;
};

module.exports = router;