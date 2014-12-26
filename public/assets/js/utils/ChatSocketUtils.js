var socket = require('socket.io-client');
var io = socket('/chat');

module.exports = {
  createMessage: function (message, channelName) {
    var createdMessage = {
      message: message,
      channelName: channelName
    }
    io.emit('chat message', createdMessage)
  },
  recieveMessage: function () {
    io.on('chat message', function (message) {
      // Notify action creator
    });
  }
}
