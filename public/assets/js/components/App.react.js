var React = require('react');
var Nickname = require('./Nickname.react');
var Sidebar = require('./Sidebar.react');
var Messages = require('./Messages.react');

var App = React.createClass({

  render: function() {
    return (
      <div className="chatApp">
        <Nickname />
        <Sidebar />
        <Messages />
      </div>
    );
  }

});

module.exports = App;
