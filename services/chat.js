/**
 * Chat socket.io application
 *
 * @author Kenny Kaye <kenny@kaye.us>
 */
var _ = require('lodash');
var avatar = require('./avatar');

/**
 * Builds payload which is sent with user events
 * @param  {Object} user       Current user
 * @param  {Array} onlineUsers Collection of all online users
 * @return {Object}            Payload
 */
function getUserPayload (user, onlineUsers) {
  return {
    user: user,
    onlineUsers: onlineUsers,
    totalOnline: onlineUsers.length
  }
}

/**
 * Chat service, exported by module
 * @param  {Http} server Http server instance
 * @return {Null}
 */
var chatApp = function (server) {
  var io = require('socket.io').listen(server);
  var chat = io.of('/chat');

  var loggedIn = false;
      messages = [],
      onlineUsers = [];

  chat.on('connection', function (socket){

    // When client adds a user.
    socket.on('add user', function (username) {
      loggedIn = true;

      // Add user to socket.
      socket.user = {
        id: 'u_' + Date.now(),
        avatar: avatar.getAvatar(username),
        username: username,
      };

      // Add current user to array of online users.
      onlineUsers.push(socket.user);

      // Emit total number of users to current user.
      socket.emit('user login', getUserPayload(socket.user, onlineUsers));

      // Broadcast to all other users that a user has joined.
      socket.broadcast.emit('user joined', getUserPayload(socket.user, onlineUsers));
    });

    // When user disconnects.
    socket.on('disconnect', function () {
      if(loggedIn) {

        // Remove current user from online users array.
        _.remove(onlineUsers, function (user) { 
          return user.id === socket.user.id; 
        });

        // Broadcast to other all users that a user has joined.
        socket.broadcast.emit('user left', getUserPayload(socket.user, onlineUsers));
      }
    });

    // When client emits a chat message.
    socket.on('chat message', function (message) {
      console.log(message.authorName + ' says: ' + message.text);
      chat.emit('chat message', message);
    });
  });
};

module.exports = chatApp;