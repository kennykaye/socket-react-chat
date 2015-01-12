// TODO: refactor actions into respective actionCreators

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  receiveAllMessages: function (messages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ALL_MESSAGES,
      messages: messages
    });
  },

  receiveMessage: function (createdMessage) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MESSAGE,
      message: createdMessage
    });
  },

  userLeft: function (userPayload) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_LEAVE,
      userPayload: userPayload
    });
  },

  userLogin: function (userPayload) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_LOGIN,
      userPayload: userPayload
    });
  },

  userJoined: function (userPayload) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_JOIN,
      userPayload: userPayload
    });
  }
};
