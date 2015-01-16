var React = require('react/addons');
var UserStore = require('../stores/UserStore');
var UserActionCreators = require('../actions/UserActionCreators');

var Name = React.createClass({

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  getInitialState: function () {
    return {
      text: null,
      isLoggedIn: false
    };
  },

  render: function () {
    var cx = React.addons.classSet;
    var classes = cx({
      'nick-name': true,
      'logged-in': this.state.isLoggedIn
    });

    return (
      <div className={classes}>
        <h4>Let's Chat!</h4>
        <form>
          <input
            className="name-input"
            placeholder="Enter a Nickname..."
            value={this.state.text}
            onChange={this._onFieldChange}
            onKeyDown={this._onKeyDown}
          />
        </form>
      </div>
    );
  },

  _onChange: function () {
    this.setState({
      isLoggedIn: UserStore.isLoggedIn()
    });
  },

  _onFieldChange: function (event, value) {
    this.setState({
      text: event.target.value
    });
  },

  _onKeyDown: function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var userName = this.state.text.trim();
      if (userName) {
        UserActionCreators.createUser(userName);
      }
      this.setState({text: ''});
    }
  }

});

module.exports = Name;