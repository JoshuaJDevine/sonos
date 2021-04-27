/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
const express = require('express')
const asyncHandler = require('express-async-handler');
const { Comment, User } = require('../../db/models');
const queries = require("../../utils/queries");
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




/*
//=====================\\
||Validation Middleware||
\\=====================//
 */
const validateComments = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a comment'),
    check('content')
        .isLength({ min: 1, max: 30 })
        .withMessage('Your comment should be 1-30 characters'),
    handleValidationErrors,
];




/*
//=====================\\
||ROUTES---------------||
\\=====================//
 */

//api/comment/:id/comments
router.get('/:trackId/comments', asyncHandler(async (req, res) => {
    // console.log(req.params.trackId);
    const comments = await queries.findTrackComments(req.params.trackId);
    return res.json({
        comments,
    });

}));

router.post('/', validateComments, asyncHandler(async (req, res) => {
    // console.log('==========');
    // console.log('POST to api/comment');
    const { content, userId, trackId } = req.body;
    //
    // console.log(content, userId, trackId);

    const newComment = await Comment.uploadNewComment(content, userId, trackId);

    return res.json({
        newComment,
    });
}))




/*
//=====================\\
||EXPORTS--------------||
\\=====================//
 */
module.exports = router;
