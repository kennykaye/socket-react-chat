module.exports = function (server) {
  var io = require('socket.io').listen(server);
  var chat = io.of('/chat');

  chat.on('connection', function (socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      chat.emit('chat message', msg);
    });
  });
};