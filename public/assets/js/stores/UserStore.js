var AppDispather = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentUser,
    _totalOnline = 0,
    _users = [];

function removeUser (user) {
  _.remove(_users, function (x) { return x.id === user.id });
}

function addUser (user) {
  _users.push(user);
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
   * Get all online users.
   * @return {Object} Users
   */
  getAllUsers: function () {
    return _users;
  },

  /**
   * Get current user.
   * @return {Object} User
   */
  getCurrentUser: function () {
    return _currentUser;
  },

  /**
   * Gets total online user count
   * @return {Integer} How many users
   */
  getUserCount: function () {
    return _totalOnline;
  }
});

UserStore.dispatchToken = AppDispather.register(function (payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CREATE_USER:
      break;

    case ActionTypes.USER_JOIN:
      _totalOnline++;
      addUser(action.user);
      UserStore.emitChange();
      break;

    case ActionTypes.USER_LEAVE:
      _totalOnline--;
      removeUser(action.user);
      UserStore.emitChange();
      break;

    case ActionTypes.USER_LOGIN:
      _currentUser = action.initialPayload.user;
      _totalOnline = action.initialPayload.totalOnline;
      _users = action.initialPayload.onlineUsers;
      UserStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = UserStore;
