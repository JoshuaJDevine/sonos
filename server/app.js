/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
//Import packages

// const { User, Playlist, Track  } = require('./db/models');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const queries = require('./utils/queries.js');

// console.log(queries);
// console.log(queries.findUserbyID(1).then((res) => {
//     console.log(res);
// }));
// console.log(queries.findUserTracks(1).then((res) => {
//     console.log(res);
// }))

//Determine environment
const { environment } = require('./config');
const isProduction = environment === 'production';

//ValidationErrors
const { ValidationError } = require('sequelize');

//Init app
const app = express();





/*
//=====================\\
||SETUP----------------||
\\=====================//
 */
//Logging Middleware
app.use(morgan('dev'));

//Parsing Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Security Middleware
if (!isProduction) {
    //enable cors only in development
    app.use(cors());
}
//Helmet helps set a variety of headers to better secure your app
app.use(helmet({
    contentSecurityPolicy: false
}));

//Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

//Routers
app.use(routes);

//Error handling - Generic
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

//Error Handling - Sequelize
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

//Error Handling - Format and return JSON with response and error messages
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});




/*
//=====================\\
||EXPORTS--------------||
\\=====================//
 */
module.exports = app;
