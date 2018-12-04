const http = require('http');
const app = require('./app')

const config = require('./config');

const server = http.createServer(app);

console.log("Server running on port: " + config.PORT)

server.listen(config.PORT);