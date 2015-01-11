var React = require('react');

var UserListItem = React.createClass({

  render: function () {
    var user = this.props.user;

    return (
      <li className='user'>
        <div class='avatar'>
          <img src={user.avatar} alt={user.username} />
        </div>
        <h5 className='user-name'>{user.username}</h5>
      </li>
    );
  }
});

module.exports = UserListItem;