var avatar = require('./avatar');

module.exports = function (server) {
  var io = require('socket.io').listen(server);
  var chat = io.of('/chat');

  var numUsers = 0,
      loggedIn = false;

  chat.on('connection', function (socket){

    // When client adds a user.
    socket.on('add user', function (username) {
      numUsers++;
      loggedIn = true;
      socket.user = {
        id: 'u_' + Date.now(),
        avatar: avatar.getAvatar(username),
        username: username,
        numUsers: numUsers
      };

      // Emit total number of users to current user.
      socket.emit('user login', socket.user);

      // Broadcast to all other users that a user has joined.
      socket.broadcast.emit('user joined', socket.user);
    });

    // When user disconnects.
    socket.on('disconnect', function () {
      if(loggedIn) {
        numUsers--;

        // Broadcast to other all users that a user has joined.
        socket.broadcast.emit('user left', socket.user);
      }
    });

    // When client emits a chat message.
    socket.on('chat message', function (message) {
      console.log(message.authorName + ' says: ' + message.text);
      chat.emit('chat message', message);
    });
  });
};