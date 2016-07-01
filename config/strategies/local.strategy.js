const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const UserModel = require('../../models/usersModel');

var localStrategy = () => {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        (username, password, done) => {

            UserModel.findOne({
                    username: username
                })
                .exec((err, results) => {
                    if (err) return console.error(err);

                    if (results.password === password) {
                        var user = results;
                        done(null, user);
                    } else {
                        done(null, false, {
                            message: 'Bad password'
                        });
                    }

                });
        }));
};

module.exports = localStrategy;