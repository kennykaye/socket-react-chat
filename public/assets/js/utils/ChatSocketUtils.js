var socket = require('socket.io-client');
var ServerActionCreators = require('../actions/ServerActionCreators');
var io = socket('/chat');


// When server emits that a new message has been sent.
io.on('chat message', function (message) {
  ServerActionCreators.receiveMessage(message);
});

// When server emits a login event for current user.
io.on('user login', function(userPayload) {
  ServerActionCreators.userLogin(userPayload);
});

// When server emits that another person has joined.
io.on('user joined', function (userPayload) {
  ServerActionCreators.userJoined(userPayload);
});

// When server emits that another person has left.
io.on('user left', function (userPayload) {
  ServerActionCreators.userLeft(userPayload);
});

module.exports = {

  createUser: function (userName) {
    io.emit('add user', userName);
  },

  createMessage: function (message, channelName) {
    var timestamp = Date.now();
    var createdMessage = {
      id: 'm_' + timestamp,
      channelID: 't_0',
      channelName: channelName,
      authorName: message.authorName,
      date:  timestamp,
      text: message.text
    };
    io.emit('chat message', createdMessage);
  }
}
