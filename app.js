const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    var html= (`
          <!doctype html>
          <html>
          <head>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
          </head>
          <body>
                <div class ="container">
                      <div class="jumbotron">
                            <h1 class="text-center">Hello World!</h1>
                            <br>
                            <h2>Develop</h2>
                      </div>
                </div>
          </body>
          </html>
    `);
    res.send(html);
});

// Running Server Details.
var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at %s:%s Port", host, port);
});
