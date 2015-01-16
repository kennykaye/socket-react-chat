var React = require('react');

var UserListItem = React.createClass({

  render: function () {
    var user = this.props.user;

    return (
      <li className='user-list-item'>
        <div className='avatar'>
          <img src={user.avatar} alt={user.username} />
        </div>
        <span className='user-name'>{user.username}</span>
      </li>
    );
  }
});

module.exports = UserListItem;