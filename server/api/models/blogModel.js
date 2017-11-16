"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var PostSchema = new Schema({
    title: {
        type: String,
        Required: "Enter the title of the post"
    },
    body: {
        type: String,
        Required: "Enter the body of the post"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Posts", PostSchema);