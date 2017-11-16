"use strict";
module.exports = function (app) {
    const passportService = require('../services/passport'); // do not remove - imports available auth strategies
    const passport = require('passport');
    const requireAuth = passport.authenticate('jwt', {session: false});
    const requireSignin = passport.authenticate('local', {session: false});

    app.route("/")
        .get(function (request, response) {
            response.send({health: 'ok'});
        });

    var blogController = require("../controllers/blogController");

    app.route("/posts")
        .get(requireAuth, blogController.getPosts)
        .post(requireAuth, blogController.addPost);

    app.route("/posts/:postId")
        .get(requireAuth, blogController.getPost)
        .put(requireAuth, blogController.updatePost)
        .delete(requireAuth, blogController.deletePost);

    const authController = require('../controllers/authController');

    app.route("/signup")
        .post(authController.signUp);

    app.route("/signin")
        .post(requireSignin, authController.signIn);
};