var React = require('react');
var Tweets = require('./tweets.jsx');

var initialState = [];

React.render(
  <Tweets data={initialState} />,
  document.getElementById('view')
);
