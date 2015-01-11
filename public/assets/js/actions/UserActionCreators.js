var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatSocketUtils = require('../utils/ChatSocketUtils');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  createUser: function (userName) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_USER,
      username: userName
    });
    ChatSocketUtils.createUser(userName);
  }
}
