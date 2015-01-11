var AppDispather = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentUser,
    _numUsers,
    _users = [];

function addUser (username) {
  _users.push(username);
}

var UserStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * Gets total online user count
   * @return {Integer} How many users
   */
  getUserCount: function () {
    return _numUsers;
  }

});

UserStore.dispatchToken = AppDispather.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CREATE_USER:
      addUser(action.username);
      UserStore.emitChange();
      break;

    case ActionTypes.USER_JOIN:
      addUser(action.user.username);
      _numUsers = action.user.numUsers;
      UserStore.emitChange();
      break;

    case ActionTypes.USER_LOGIN:
      _numUsers = action.numUsers;
      UserStore.emitChange();
      break;

    case ActionTypes.USER_LEAVE:
      _numUsers = action.user.numUsers;
      _users.splice(_users.indexOf(action.user.username));
      UserStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = UserStore;
