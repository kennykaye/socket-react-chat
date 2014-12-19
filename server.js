'use strict';

var fs        = require('fs');
var morgan    = require('morgan');
var express   = require('express');
var mongoose  = require('mongoose');

var app     = express();
var log     = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
var mongodb = 'mongodb://127.0.0.1:27017/socket-react-chat';
mongoose.connect(mongodb);

// Log Database Connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('MonogoDB Connected at ' + mongodb);
});

app.use(morgan('dev'));
app.use(morgan('combined', {stream: log}));

app.use('/', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public/dist'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen('1337', function () {
  console.log('Server Connected at http://127.0.0.1:1337');
});