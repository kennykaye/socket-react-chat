var socket = require('socket.io-client');
var ServerActionCreators = require('../actions/ServerActionCreators');
var io = socket('/chat');

io.on('chat message', function (message) {
  console.log(message.authorName + ' says: ' + message.text);
  ServerActionCreators.receiveMessage(message);
});

module.exports = {
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
