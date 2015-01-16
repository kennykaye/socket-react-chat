var React = require('react');
var UserStore = require('../stores/UserStore');
var UserListItem = require('./UserListItem.react');

/**
 * Get component state from store methods
 * @return {Object} Current state
 */
function getStateFromStores() {
  return {
    count: UserStore.getUserCount(),
    users: UserStore.getAllUsers()
  };
}

/**
 * Return user list item component for a given user
 * @param  {Object} user User object.
 * @return {React}       User list item react component.
 */
function getUserListItem(user) {
  return (<UserListItem user={user} />);
}

var UsersOnline = React.createClass({
  
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  getInitialState: function () {
    return {
      count: 0,
      users: []
    }
  },

  render: function () {
    var userListItems =this.state.users.map(getUserListItem);
    return (
      <div className='users-online'>
        <span className='indicator'></span>
        <span className='count'>{this.state.count}</span>
        <span className='description'>{this.state.count === 1 ? 'user' : 'users'} online</span>
        <ul className='online-user-list'>
          {userListItems}
        </ul>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = UsersOnline;