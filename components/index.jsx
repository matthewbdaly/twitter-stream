var $ = require('jquery');
var io = require('socket.io-client');

$(document).ready(function () {
    'use strict';

    // Set up the connection
    var socket = io.connect(window.location.href);

    // Handle incoming messages
    socket.on('message', function (data) {
        // Insert the message
        console.log(data);
    });
});
