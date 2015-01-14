var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  receiveMessage: function (message) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MESSAGE,
      message: message
    });
  },

  userLeft: function (user) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_LEAVE,
      user: user
    });
  },

  userLogin: function (initialPayload) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_LOGIN,
      initialPayload: initialPayload
    });
  },

  userJoined: function (user) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_JOIN,
      user: user
    });
  }
};
