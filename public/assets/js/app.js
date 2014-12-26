// This file bootstraps the entire application.

var Chat = require('./components/Chat.react');
var ChatAPIUtils = require('./utils/ChatAPIUtils');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

React.render(
    <Chat />,
    document.getElementById('react')
);
