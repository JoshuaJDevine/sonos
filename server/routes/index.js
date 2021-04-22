/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);




/*
//=====================\\
||TEST ROUTES----------||
\\=====================//
 */
router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});




module.exports = router;
