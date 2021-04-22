/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
const express = require('express');
const router = express.Router();




/*
//=====================\\
||TEST ROUTE-----------||
\\=====================//
 */
router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;
