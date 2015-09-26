var React = require('react');
var TweetItem = require('./tweetitem.jsx');

var TweetList = React.createClass({
  render: function () {
    var that = this;
    var tweetNodes = this.props.data.map(function (item, index) {
      return (
        <TweetItem key={index} text={item.text}></TweetItem>
      );
    });
    return (
      <ul className="tweets list-group">
        {tweetNodes}
      </ul>
    )
  }
});

module.exports = TweetList;
