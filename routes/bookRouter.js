const express = require('express');
const bookRouter = express.Router();
const bookService = require('../services/goodreadsService')();

var rounter = (nav) => {

    const bookController = require('../controllers/bookController')(bookService, nav);

    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;
};

module.exports = rounter;