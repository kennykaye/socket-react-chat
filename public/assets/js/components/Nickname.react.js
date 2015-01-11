var React = require('react');
var UserActionCreators = require('../actions/UserActionCreators');

var Name = React.createClass({

  getInitialState: function () {
    return {
      text: null
    }
  },

  render: function () {
    return (
      <form className="nickName">
        <h4>Enter a Nickname:</h4>
        <input 
          className="nameInput" 
          value={this.state.text}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
        />
      </form>
    );
  },

  _onChange: function (event, value) {
    this.setState({text: event.target.value});
  },

  _onKeyDown: function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var userName = this.state.text.trim();
      if (userName) {
        UserActionCreators.createUser(userName);
      }
      this.setState({text: ''});
    }
  }

});

module.exports = Name;