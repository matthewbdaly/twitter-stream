# twitter-stream
A simple Twitter stream viewer that uses Node.js, React.js and Redis.

There are two files that need to be run. `worker.js` fetches the tweets and publishes them to Redis. `index.js` handles HTTP requests and sends new tweets to users using Socket.io.
