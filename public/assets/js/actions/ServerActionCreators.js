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

  userLeft: function (user) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_LEAVE,
      user: user
    });
  },

  userLogin: function (numUsers) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_LOGIN,
      numUsers: numUsers
    });
  },

  userJoined: function (user) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_JOIN,
      user: user
    });
  }
};
