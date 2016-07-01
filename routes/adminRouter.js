 /**
  * This page is created for inserting dummy data into mongodb
  * This should NEVER be used in prod
  * Should be replaced by adding files through the web app.
  */
const express = require('express');
const adminRouter = express.Router();
const mongoose = require('mongoose');
const bookModel = require('../models/bookModel');


  
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

var router = (nav) => {

    adminRouter.route('/addBooks')
        .get((req, res) => {

            bookModel.collection.insert(booksArray, onInsert);

            function onInsert(err, docs) {
                if (err) {
                    return console.log('err ' + err)
                }

                //Shows in term/command line that everything has inserted 
                return console.log(res.send = docs)
            }
        });

    return adminRouter;
};

module.exports = router;