var React = require('react');

var MessagesList = React.createClass({

  render: function () {
    var message = this.props.message;

    return (
      <li className='message'>
        <h5 className="message-author-name">{message.author.username}</h5>
        <div className="message-time">
          {new Date(message.date).toLocaleTimeString()}
        </div>
        <div className="message-text">{message.text}</div>
      </li>
    );
  }
});

module.exports = MessagesList;