var fs       = require('fs');
var morgan   = require('morgan');
var express  = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var database = require('./config/database.js');

var app     = express();
var server  = require('http').createServer(app);
var log     = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

// Database Connection
mongoose.connect(database.url);

// Mount Middleware
app.use(morgan('dev'));
app.use(morgan('combined', {stream: log}));
app.use(passport.initialize());
app.use(passport.session());

// Load configurations and routes
require('./config/passport')(passport);
require('./app/services/chat')(server);
require('./app/routes/base-routes')(app);
require('./app/routes/users-routes')(app);
require('./app/routes/messages-routes')(app);
require('./app/routes/auth-routes')(app, passport);

// Listen on port
server.listen('1337', function () {
  console.log('Server Connected at http://127.0.0.1:1337');
});