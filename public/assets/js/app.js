var $ = require('jquery');
var io = require('socket.io-client');
var socket = io('/chatio');

$('form').stop().submit(function(event){
  event.preventDefault();
  socket.emit('chat message', $('#message').val());
  $('#message').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});