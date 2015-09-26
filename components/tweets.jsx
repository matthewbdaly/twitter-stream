var React = require('react');
var TweetList = require('./tweetlist.jsx');

var Tweets = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Tweets</h1>
        <TweetList data={this.props.data} />
      </div>
    )
  }
});

module.exports = Tweets;
