/*jslint node: true */
'use strict';

require('babel/register');

// Get dependencies
var Twitter = require('twitter');

var express = require('express');
var app = express();
var compression = require('compression');
var port = process.env.PORT || 5000;
var base_url = process.env.BASE_URL || 'http://localhost:5000';
var bodyParser = require('body-parser');
var hbs = require('hbs');
var morgan = require('morgan');
var React = require('react');
var Tweets = React.createFactory(require('./components/tweets.jsx'));

// Set up Twitter client
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Set up connection to Redis
var redisclient, subscribe;
if (process.env.REDIS_URL) {
  redisclient = require('redis').createClient(process.env.REDIS_URL);
  subscribe = require('redis').createClient(process.env.REDIS_URL);
} else {
  redisclient = require('redis').createClient();
  subscribe = require('redis').createClient();
}

// Set up templating
app.set('views', __dirname + '/views');
app.set('view engine', "hbs");
app.engine('hbs', require('hbs').__express);

// Register partials
hbs.registerPartials(__dirname + '/views/partials');

// Set up logging
app.use(morgan('combined'));

// Compress responses
app.use(compression());

// Set URL
app.set('base_url', base_url);

// Handle POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));

// Serve static files
app.use(express.static(__dirname + '/static'));

// Render main view
app.get('/', function (req, res) {
  // Get tweets
  redisclient.lrange('stream:tweets', 0, -1, function (err, tweets) {
    if (err) {
      console.log(err);
    } else {
      // Get tweets
      var tweet_list = [];
      tweets.forEach(function (tweet, i) {
        tweet_list.push(JSON.parse(tweet));
      });

      // Render page
      var markup = React.renderToString(Tweets({ data: tweet_list }));
      res.render('index', {
        markup: markup,
        state: JSON.stringify(tweet_list)
      });
    }
  });
});

// Listen
var io = require('socket.io')({
}).listen(app.listen(port));
console.log("Listening on port " + port);

// Handle connections
io.sockets.on('connection', function (socket) {
  // Subscribe to the Redis channel
  subscribe.subscribe('tweets');

  client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
    stream.on('data', function(tweet) {
      // Publish it
      redisclient.publish('tweets', JSON.stringify(tweet));

      // Persist it to a Redis list
      redisclient.rpush('stream:tweets', JSON.stringify(tweet));
    });
  });

  // Handle receiving messages
  var callback = function (channel, data) {
    socket.emit('message', data);
  };
  subscribe.on('message', callback);

  // Handle disconnect
  socket.on('disconnect', function () {
    subscribe.removeListener('message', callback);
  });
});
