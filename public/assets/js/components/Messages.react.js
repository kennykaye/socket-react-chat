var React = require('react');
var ChannelHeader = require('./ChannelHeader.react');
// var MessageList = require('./MessageList.react');
var MessageComposer = require('./MessageComposer.react');

var Messages = React.createClass({
  render: function () {
    return (
      <div className='messages'>
        <ChannelHeader />
        // <MessageList />
        <MessageComposer />
      </div>
    );
  }
});

module.exports = Messages;