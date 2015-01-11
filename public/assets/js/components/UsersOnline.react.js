var React = require('react');
var UserStore = require('../stores/UserStore');

function getStateFromStores() {
  return {
    count: UserStore.getUserCount()
  };
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
      count: 0
    }
  },

  render: function () {
    return (
      <div className='users-online'>
        <span className='indicator'></span>
        <span className='count'>{this.state.count}</span>
        <span className='description'>users online</span>
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