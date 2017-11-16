var express = require("express"),
    app = express(),
    port = process.env.PORT || 8081,
    mongoose = require("mongoose"),
    morgan = require("morgan"),
    Post = require("./api/models/blogModel"),
    User = require("./api/models/userModel"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    Roles = require("express-roles-authorization");

const passport = require('passport');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog", {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: '*/*'}));
app.use(morgan('combined'));
app.use(cors());

app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

var roles = new Roles({
    permissionsMapFile: '../../../permissions.json',
    authenticationFunction: function (req, res, next, callback) {
        passport.authenticate('jwt', function (err, user) {
            return callback(err, user);
        })(req, res, next);
    }
});

app.use(roles.middleware());

var routes = require("./api/routes/routes");
routes(app);

app.listen(port);

console.log("Blog RESTful API server started on: " + port);