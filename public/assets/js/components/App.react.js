var React = require('react');
var Sidebar = require('./Sidebar.react');
var Messages = require('./Messages.react');

var App = React.createClass({

  render: function() {
    return (
      <div className="chatapp">
        <Sidebar />
        <Messages />
      </div>
    );
  }

});

module.exports = App;
