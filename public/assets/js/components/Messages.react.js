var React = require('react');
var ChannelHeader = require('./ChannelHeader.react');
var MessageStore = require('../stores/MessageStore');
var MessageListItem = require('./MessageListItem.react');
var MessageComposer = require('./MessageComposer.react');

function getStateFromStores() {
  return {
    messages: MessageStore.getAllMessages()
  };
}


function getMessageListItem(message) {
  return (
    <MessageListItem
      message={message}
    />
  );
}

var Messages = React.createClass({
  
  getInitialState: function() {
    return {
      messages: []
    };
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var messageListItems =this.state.messages.map(getMessageListItem);
    return (
      <div className='messages'>
        <ChannelHeader />
        <ul className='message-list'>
          {messageListItems}
        </ul>
        <MessageComposer />
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

module.exports = Messages;