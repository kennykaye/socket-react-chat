var React = require('react');
var UsersOnline = require('./UsersOnline.react');

var ChannelHeader = React.createClass({
  render: function () {
    return (
      <div className='channel-header'>
        <h1 className='channel-title'><span className='hash'>#</span>Beer-o-Clock</h1>
        <p className='channel-description'>In search of the Ballmer peak.</p>
        <UsersOnline />
      </div>
    );
  }
});

module.exports = ChannelHeader;