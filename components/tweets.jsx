var React = require('react');
var io = require('socket.io-client');
var TweetList = require('./tweetlist.jsx');
var _ = require('lodash');

var Tweets = React.createClass({
  componentDidMount: function () {
    // Get reference to this item
    var that = this;
    
    // Set up the connection
    var socket = io.connect(window.location.href);

    // Handle incoming messages
    socket.on('message', function (data) {
      // Insert the message
      var tweets = that.props.data;
      tweets.push(JSON.parse(data));
      tweets = _.sortBy(tweets, function (item) {
        return item.created_at;
      }).reverse();
      that.setProps({data: tweets});
    });
  },
  getInitialState: function () {
    return {data: this.props.data};
  },
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
