"use strict";

const mongoose = require("mongoose"),
    User = mongoose.model("Users");

const jwt = require('jwt-simple');
const config = require('../../config');

const emailFilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.signUp = function (request, response, next) {
    const email = request.body.email;
    const password = request.body.password;
    const roles = request.body.roles;

    if (!valid(email, password)) {
        return response.status(422).send({error: 'You must provide valid email and password'})
    }

    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }

        if (existingUser) {
            return response.status(422).send({error: 'Email is in use'});
        }

        const user = new User({
            email: email,
            password: password,
            roles: ["regularUser"]
        });

        user.save(function (err) {
            if (err) {
                return next(err);
            }
            response.json({token: tokenForUser(user), roles: user.roles});
        });
    });
};

exports.signIn = function (request, response, next) {
    response.send({token: tokenForUser(request.user), roles: request.user.roles});
};

function valid(email, password) {
    return email && emailFilter.test(email) && password;
}

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    const exp = timestamp + (2 * 60 * 1000);
    return jwt.encode({sub: user._id, iat: timestamp, exp: exp}, config.secret);
}