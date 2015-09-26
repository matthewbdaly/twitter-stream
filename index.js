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

// Set up Twitter client
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

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
  res.render('index');
});

client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});

// Listen
app.listen(port);
console.log("Listening on port " + port);
