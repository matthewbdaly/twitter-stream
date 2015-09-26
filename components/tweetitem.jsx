var React = require('react');

var TweetItem = React.createClass({
  render: function () {
    return (
      <li>{this.props.text}</li>
    );
  }
});

module.exports = TweetItem;
