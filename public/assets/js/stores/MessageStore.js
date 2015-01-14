var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatSocketUtils = require('../utils/ChatSocketUtils');
var UserStore = require('../stores/UserStore');

var _messages = {};
var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

function addMessage(message) {
  _messages.push(message);
}

var MessageStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllMessages: function() {
    return _messages;
  },

  getMessageById: function(id) {
    return _.find(_messages, {id: id});
  },

  getMessageData: function(text) {
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      author: UserStore.getCurrentUser(),
      date: timestamp,
      text: text
    };
  }
});


MessageStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CREATE_MESSAGE:
      break;

    case ActionTypes.RECEIVE_MESSAGE:
      addMessage(action.message);
      MessageStore.emitChange();
      break;

   case ActionTypes.USER_LOGIN:
      _messages = action.initialPayload.messages;
      MessageStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = MessageStore;