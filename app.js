const express = require('express');
const app = express();
const morgan = require('morgan'); //middleware for authentication
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const users = require('./api/routes/users');
const assignments = require('./api/routes/assignments');

const config = require('./config');

mongoose.connect(config.DB_PATH);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); //this would parse urlencoded requets, without rich-extended options (false)
app.use(bodyParser.json()); // this will extract json data from requests

// headers to prevent CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    //sent by browser in post req, to check if it's possibile to perform it
    if(req.method === 'OPTIONS'){
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        
        return res.status(200).json({});
    }

    next();
});

// Set routes which should handle requests, these method forwards directly to js file with corrispondent method
// app.use("/exercises", exercises);
app.use('/users', users);
app.use('/assignments', assignments);

// if the server reach that line, none of the routes above was able to process the request, so i should send an error message
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    //this will forward the error req insted of the original
    next(error);
})

//* Error Handler
// this method will be called from "next(error)"
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;