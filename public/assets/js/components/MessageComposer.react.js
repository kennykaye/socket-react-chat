var MessageActionCreators = require('../actions/MessageActionCreators');
var UserStore = require('../stores/UserStore');
var React = require('react');

/**
 * Triggers create message action
 * @param  {String} text Message body to send
 * @return {Null}
 */
function createMessage(text) {
  var text = text.trim();
  if (text) {
    MessageActionCreators.createMessage(text);
  }
}

var MessageComposer = React.createClass({

  getInitialState: function () {
    return {
      text: ''
    };
  },

  render: function () {
    return (
      <div className='message-composer'>
        <textarea
          name='message'
          className='message-input'
          placeholder='Type your message here...'
          value={this.state.text}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
        />
        <button 
          className='message-send'
          onClick={this._onClick}
        >Send</button>
      </div>
    );
  },

  _onChange: function (event, value) {
    this.setState({
      text: event.target.value
    });
  },

  _onClick: function (event) {
    event.preventDefault();
    createMessage(this.state.text);
    this.setState({text: ''});
  },

  _onKeyDown: function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      createMessage(this.state.text);
      this.setState({text: ''});
    }
  }

});

module.exports = MessageComposer;
