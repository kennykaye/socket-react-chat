var React = require('react');
var ChannelHeader = require('./ChannelHeader.react');
var MessagesList = require('./MessagesList.react');
var MessageComposer = require('./MessageComposer.react');

var Messages = React.createClass({
  render: function () {
    return (
      <div className='messages'>
        <ChannelHeader />
        <MessagesList />
        <MessageComposer />
      </div>
    );
  }
});

module.exports = Messages;