var React = require('react');

var TweetItem = React.createClass({
  render: function () {
    return (
      <li className="list-group-item">{this.props.text}</li>
    );
  }
});

module.exports = TweetItem;
