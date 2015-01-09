var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatSocketUtils = require('../utils/ChatSocketUtils');
var MessageStore = require('../stores/MessageStore');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  createMessage: function(text) {
    var message = MessageStore.getMessageData(text);
    
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_MESSAGE,
      message: message
    });
    ChatSocketUtils.createMessage(message);
  }

};
