var React = require('react');
var UserStore = require('../stores/UserStore');
var UserListItem = require('./UserListItem.react');

/**
 * Get component state from store methods
 * @return {Object} Current state
 */
function getStateFromStores() {
  return {
    user: UserStore.getCurrentUser()
  };
}

/**
 * Return user list item component for a given user
 * @param  {Object} user User object.
 * @return {React}       User list item react component.
 */
function getUserListItem(user) {
  if(user) {
    return (<UserListItem user={user} />);
  }
}

var Sidebar = React.createClass({

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  getInitialState: function () {
    return { user: null }
  },

  render: function () {
    return (
      <div className='sidebar'>
        { getUserListItem(this.state.user) }
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

module.exports = Sidebar;

