var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChannelStore = require('../stores/ChannelStore');
var ChatConstants = require('../constants/ChatConstants');
var ChatSocketUtils = require('../utils/ChatSocketUtils');

var _messages = {};
var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

function _addMessages(messages) {
  messages.forEach(function(message) {
    if (!_messages[message.id]) {
      _messages[message.id] = message;
    }
  });
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

  get: function(id) {
    return _messages[id];
  },

  getAll: function() {
    return _messages;
  },

  /**
   * @param {string} channelID
   */
  getAllForChannel: function(channelID) {
    var channelMessages = [];
    for (var id in _messages) {
      if (_messages[id].channelID === channelID) {
        channelMessages.push(_messages[id]);
      }
    }
    channelMessages.sort(function(a, b) {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
    return channelMessages;
  },

  getAllForCurrentChannel: function() {
    return this.getAllForChannel(ChannelStore.getCurrentID());
  },

  getMessageData: function(text) {
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      ChannelID: 't_0',
      // ChannelID: ChannelStore.getCurrentID(),
      authorName: 'Kenny', // hard coded for the example
      date: timestamp,
      text: text,
      isRead: true
    };
  }
});


MessageStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CLICK_THREAD:
      AppDispatcher.waitFor([ChannelStore.dispatchToken]);
      _markAllInThreadRead(ChannelStore.getCurrentID());
      MessageStore.emitChange();
      break;

    // case ActionTypes.CREATE_MESSAGE:
    case ActionTypes.RECEIVE_MESSAGE:
      _addMessages([action.message]);
      MessageStore.emitChange();
      break;

    case ActionTypes.RECEIVE_ALL_MESSAGES:
      // _addMessages(action.message);
      MessageStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = MessageStore;