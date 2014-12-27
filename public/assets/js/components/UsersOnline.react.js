var React = require('react');

var UsersOnline = React.createClass({
  getInitialState: function () {
    return {
      quantity: 10
    }
  },
  render: function () {
    return (
      <div className='users-online'>
        <span className='indicator'></span>
        <span className='quantity'>{this.state.quantity}</span>
        <span className='description'>users online</span>
      </div>
    );
  }
});

module.exports = UsersOnline;