const express = require('express');

var indexRouter = express.Router();

var router = (nav) => {

    indexRouter.route('/')
        .get((req, res) => {

            res.render('indexView', {
                title: 'Hello, {{You!}}',
                nav: nav, 
                layout: 'shell'
            });

        });

    return indexRouter;
};

module.exports = router;