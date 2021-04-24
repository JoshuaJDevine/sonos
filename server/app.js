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
const cookieParser = require('cookie-parser');
const routes = require('./routes');

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
app.use(express.json());

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





//SEQUELIZE TESTS
// async function lookupUser(userId) {
//     const user = await User.findByPk(userId, {
//         include: Track,
//     });
    // const user = await User.findByPk(userId);

    // Track.create({
    //     userId: 1,
    //     url: 'http:/aws.mytrack.com'
    // }).then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err)
    // })
    //test
    //
    // Playlist.create({
    //     name: 'test',
    //     isPrivate: false
    // }).then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err)
    // })
    //test

    //
    // return user;
    //test
//
// }

// lookupUser(1).then((res) => {
//     console.log('=========sequelize test===========')
//     console.log(res.dataValues.username, ' is associated with', res.Tracks.length, 'tracks');
//     console.log('This is a great success!');
//     console.log('the tracks are: ')
//     res.Tracks.forEach((el) => {console.log(el.dataValues.url)})
//     //Test;
//     //Test
// });





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
