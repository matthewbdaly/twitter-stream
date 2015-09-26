var React = require('react');
var Tweets = require('./tweets.jsx');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);
debugger;

React.render(
  <Tweets data={initialState} />,
  document.getElementById('view')
);
