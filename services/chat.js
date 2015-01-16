/**
 * Chat socket.io application
 *
 * @author Kenny Kaye <kenny@kaye.us>
 */
var _ = require('lodash');
var avatar = require('./avatar');

/**
 * Builds payload which is sent when a user logs in
 * @param  {Object} user        Current user
 * @param  {Array}  onlineUsers Collection of all online users
 * @return {Object}             Payload
 */
function getInitialPayload (user, onlineUsers, messages) {
  return {
    messages: messages,
    onlineUsers: onlineUsers,
    totalMessages: messages.length,
    totalOnline: onlineUsers.length,
    user: user
  };
}

/**
 * Chat service, exported by module
 * @param  {Http} server Http server instance
 * @return {Null}
 */
var chatApp = function (server) {
  var io = require('socket.io').listen(server);
  var chat = io.of('/chat');

  var loggedIn = false,
      messages = [],
      onlineUsers = [];

  chat.on('connection', function (socket){

    // When client adds a user.
    socket.on('add user', function (username) {
      loggedIn = true;

      // Add user to socket.
      socket.user = {
        id: 'u_' + Date.now(),
        avatar: avatar.getAvatar(username, 140),
        username: username,
      };

      // Add current user to array of online users.
      onlineUsers.push(socket.user);

      // Emit total number of users to current user.
      socket.emit('user login', getInitialPayload(socket.user, onlineUsers, messages));

      // Broadcast to all other users that a user has joined.
      socket.broadcast.emit('user joined', socket.user);
    });

    // When user disconnects.
    socket.on('disconnect', function () {
      if (loggedIn) {
        var userId = socket.user ? socket.user.id : '';
        
        // Remove current user from online users array.
        _.remove(onlineUsers, function (user) { 
          return user.id === userId; 
        });

        // Broadcast to other all users that a user has joined.
        socket.broadcast.emit('user left', socket.user);
      }
    });

    // When client emits a chat message.
    socket.on('chat message', function (message) {
      messages.push(message);
      chat.emit('chat message', message);
    });
  });
};

module.exports = chatApp;