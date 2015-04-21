/**
 * Simple express-socket.io server
 *
 * @author Kenny Kaye <kenny@kaye.us>
 */

var fs       = require('fs');
var morgan   = require('morgan');
var express  = require('express');

var app     = express();
var server  = require('http').createServer(app);
var log     = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

// Mount middleware
app.use(morgan('dev'));
app.use(morgan('combined', {stream: log}));

// Default routes
app.use('/', express.static(__dirname + '/public/dist/'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Load chat socket service
require('./services/chat')(server);

// Listen on port
server.listen('80', function () {
  console.log('Server Connected at http://127.0.0.1:80');
});
