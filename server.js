'use strict';

var fs        = require('fs');
var morgan    = require('morgan');
var express   = require('express');
// var mongoose  = require('mongoose');

var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
var log     = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});


// Database Connection
// var mongodb = 'mongodb://127.0.0.1:27017/socket-react-chat';
// mongoose.connect(mongodb);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log('MonogoDB Connected at ' + mongodb);
// });

// Log http requests
app.use(morgan('dev'));
app.use(morgan('combined', {stream: log}));

// Route static requests
app.use('/', express.static(__dirname + '/public/dist/'));

// Default route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Socket connection
var chatio = io.of('/chat'); // To prevent collision with browser-sync
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

server.listen('1337', function () {
  console.log('Server Connected at http://127.0.0.1:1337');
});