const express = require('express');
const authRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const UsersModel = require('../models/usersModel');


var router = () => {
    authRouter.route('/signUp')
        .post((req, res) => {
            var newUser = new UsersModel({
                username: req.body.userName,
                password: req.body.password
            });

            newUser.save((err, results) => {
                if (err) return console.error(err);
                console.info(req.body.userName + ' has been successfully added');

                req.login(results, () => {
                    res.redirect('/auth/profile');
                });
            });
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (!req.user) {
                return res.redirect('/');
            }
            next();
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;