'use strict';

var fs       = require('fs');
var morgan   = require('morgan');
var express  = require('express');
var passport = require('passport');
var oauth    = require('./config/oauth.js');
// var mongoose  = require('mongoose');

var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
var log     = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
var GithubStrategy   = require('passport-github').Strategy;
var GoogleStrategy   = require('passport-google').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


// Database Connection
// var mongodb = 'mongodb://127.0.0.1:27017/socket-react-chat';
// mongoose.connect(mongodb);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log('MonogoDB Connected at ' + mongodb);
// });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

// Log http requests
app.use(morgan('dev'));
app.use(morgan('combined', {stream: log}));

// Auth Middleware
app.use(passport.initialize());
app.use(passport.session());

// Route static requests
app.use('/', express.static(__dirname + '/public/dist/'));

// Default route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/login.html');
});
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});


// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ''}));
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

// Socket connection
var chatio = io.of('/chatio'); // To prevent collision with browser-sync
chatio.on('connection', function (socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    chatio.emit('chat message', msg);
  });
});

// Passport
passport.use(new FacebookStrategy({
  clientID: oauth.facebook.clientID,
  clientSecret: oauth.facebook.clientSecret,
  callbackURL: oauth.facebook.callbackURL,
  profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'gender'], 
}, function (accessToken, refreshToken, profile, done) {
  console.log(profile);
  process.nextTick(function () {
    return done(null, profile);
  });
}));

server.listen('1337', function () {
  console.log('Server Connected at http://127.0.0.1:1337');
});