"use strict";

var mongoose = require("mongoose"),
    Post = mongoose.model("Posts");

exports.getPosts = function (request, response) {
    Post.find({}, function (error, posts) {
        if (error) {
            response.send(error);
        }
        response.json(posts);
    });
};

exports.addPost = function (request, response) {
    var newPost = new Post(request.body);
    newPost.save(function (error, post) {
        if (error) {
            response.send(error);
        }
        response.json(post);
    });
};

exports.getPost = function (request, response) {
    Post.findById(request.params.postId, function (error, post) {
        if (error) {
            response.send(error);
        }
        response.json(post);
    });
};

exports.updatePost = function (request, response) {
    Post.findOneAndUpdate({_id: request.params.postId}, request.body, {new: true}, function (error, post) {
        if (error) {
            response.send(error);
        }
        response.json(post);
    });
};

exports.deletePost = function (request, response) {
    Post.remove({_id: request.params.postId}, function (error, post) {
        if (error) {
            response.send(error);
        }
        response.json({message: "Post successfully deleted"});
    });
};