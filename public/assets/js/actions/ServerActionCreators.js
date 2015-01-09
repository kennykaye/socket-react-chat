var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  receiveAll: function(messages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ALL_MESSAGES,
      messages: messages
    });
  },

  receiveMessage: function(createdMessage) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MESSAGE,
      message: createdMessage
    });
  }

};
