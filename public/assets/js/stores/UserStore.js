var AppDispather = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentUser,
    _numUsers = 0,
    _users = [];

/**
 * Add user to array of current users.
 * @param {Object} user User server payload.
 */
function addUser (user) {
  _users.push(UserStore.getUserData(user));
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
   * Gets total online user count
   * @return {Integer} How many users
   */
  getUserCount: function () {
    return _numUsers;
  },

  /**
   * Get relevent user data from payload
   * @return {Object} Formatted user data
   */
  getUserData: function (user) {
    return {
      id: user.id,
      avatar: user.avatar,
      username: user.username
    }
  }
});

UserStore.dispatchToken = AppDispather.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CREATE_USER:
      // Fires when user is newly created, but not logged in.
      // UserStore.emitChange();
      break;

    case ActionTypes.USER_JOIN:
    case ActionTypes.USER_LOGIN:
      addUser(action.user);
      _numUsers = action.user.numUsers;
      UserStore.emitChange();
      break;

    case ActionTypes.USER_LEAVE:
      _numUsers = action.user.numUsers;
      _users.splice(_.findIndex({'id': action.user.id}));
      UserStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = UserStore;
