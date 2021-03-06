/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
const express = require('express')
const asyncHandler = require('express-async-handler');
const queries = require("../../utils/queries");
const {singlePublicFileUpload} = require("../../awsS3");
const {singleMulterUpload} = require("../../awsS3");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




/*
//=====================\\
||Validation Middleware||
\\=====================//
 */
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 7 })
        .withMessage('Password must be 7 characters or more.'),
    handleValidationErrors,
];



/*
//=====================\\
||ROUTES---------------||
\\=====================//
 */
//Logout     POST  /api/users
// router.post('/', validateSignup, asyncHandler(async (req, res) => {
//         const { email, password, username } = req.body;
//         const user = await User.signup({ email, username, password });
//
//         await setTokenCookie(res, user);
//
//         return res.json({
//             user,
//         });
//     }),
// );


//AWS UPLOAD
router.post(
    "/",
    singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username, image } = req.body;
        // console.log(req.body);
        // console.log(req.file);
        const profileImageUrl = await singlePublicFileUpload(req.file);




        const user = await User.signup({
            username,
            email,
            password,
            profileImageUrl,
        });

        setTokenCookie(res, user);

        return res.json({
            user,
        });
    })
);

//api/users/:id/tracks
router.get('/:userId/tracks', asyncHandler(async (req, res) => {
    // console.log(req.params);

    const User = await queries.findUserTracks(req.params.userId);

    // console.log(User.Tracks);

    return res.json({
        User,
    });

}));




/*
//=====================\\
||EXPORTS--------------||
\\=====================//
 */
module.exports = router;
