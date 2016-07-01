const BookModel = require('../models/bookModel');
var books, id;

var bookController = (bookService, nav) => {
    //Ensure the user is logged in
    var middleware = (req, res, next) => {
        if (!req.user) {
            //return res.redirect('/');
        }
        next();
    };


    //Get all books
    var getIndex = (req, res) => {
        BookModel
            .find({})
            .exec((err, results) => {
                if (err) return console.error(err);

                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: results,
                    layout: 'shell'
                });
            });
    };

    //Get specific book by id
    var getById = (req, res) => {
        id = req.params.id;

        BookModel
            .findOne({
                _id: id
            })
            .exec((err, results) => {
                if (err) return console.error(err);
  
                if (results.bookId) {
                    bookService.getBookById(results.bookId,
                        (err, book) => {
                            results.book = book;
                            res.render('bookView', {
                                title: 'Book',
                                nav: nav,
                                books: results,
                                layout: 'shell'
                            });
                        });
                } else {
                    res.render('bookView', {
                        title: 'Book',
                        nav: nav,
                        books: results,
                        layout: 'shell'
                    });
                }
            });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;