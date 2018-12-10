const mongoose = require('mongoose');
const http = require('http');
const app = require('./app')
const config = require('./config');

mongoose.connect(config.DB_PATH, config.DB_OPTIONS).then(() => {
  // Connected to db server
  console.log(`Connected to db server: "${config.DB_PATH}"`);
  const server = http.createServer(app);

  server.on('error', (err) => {
    //Server error handler
    if (err.code === 'EADDRINUSE')
      console.error("Address/port in use. Stop other process and restart");
    else
      console.error("Error in server listening: Error Code " + err.code);
  });

  server.listen(config.PORT, () => {
    console.log(`Server listening on port: ${config.PORT}`);
  });

}).catch(err => {
  // Error in connecting to db server
  console.error(`Connection error to db server: ${config.DB_PATH}`)
  console.error("Error name: "+ err.name)
});