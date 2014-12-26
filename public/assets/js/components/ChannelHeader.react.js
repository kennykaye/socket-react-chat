var React = require('react');
var UsersOnline = require('./UsersOnline.react');

var Channels = React.createClass({
  render: function () {
    return (
      <div className='channel-header'>
        <h1>#Channel</h1>
        <p>Description</p>
        <UsersOnline />
      </div>
    );
  }
});