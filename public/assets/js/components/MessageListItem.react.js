var React = require('react');

var MessagesList = React.createClass({

  render: function () {
    var message = this.props.message;

    return (
      <li className='message-list-item'>
        <div className='author-avatar'>
          <img src={message.author.avatar} alt={message.author.username} />
        </div>
        <div className='message-by-line'>
          <h5 className="author-name">{message.author.username}</h5>
          <div className="message-time">
            {new Date(message.date).toLocaleTimeString().replace(/:\d+ /, '')}
          </div>
        </div>
        <div className="message-text">{message.text}</div>
      </li>
    );
  }
});

module.exports = MessagesList;