var React = require('react');
var io = require('socket.io-client');
var TweetItem = require('./tweetitem.jsx');

var TweetList = React.createClass({
  componentDidMount: function () {
    // Set up the connection
    var socket = io.connect(window.location.href);

    // Handle incoming messages
    socket.on('message', function (data) {
        // Insert the message
        console.log(data);
    });
  },
  render: function () {
    var that = this;
    /*
    var tweetNodes = this.props.data.map(function (item, index) {
      return (
        <TweetItem text={item.text}></TweetItem>
      );
    });
    */
    return (
      <ul className="tweets">
      </ul>
    )
  }
});

module.exports = TweetList;
