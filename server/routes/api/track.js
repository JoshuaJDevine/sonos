/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
const express = require('express')
const asyncHandler = require('express-async-handler');
const {singlePublicFileUpload} = require("../../awsS3");
const {singleMulterUpload} = require("../../awsS3");
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Track } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




/*
//=====================\\
||Validation Middleware||
\\=====================//
 */
const validateTrack = [
    check('mp3')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a track to upload.'),
    check('trackName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 128 })
        .withMessage('Please provide a valid track name.'),
    handleValidationErrors,
];




/*
//=====================\\
||ROUTES---------------||
\\=====================//
 */
//AWS UPLOAD
router.post(
    "/",
    singleMulterUpload("mp3"),
    // validateTrack,
    asyncHandler(async (req, res) => {


        const { trackName, userId } = req.body;
        const newTrackUrl = await singlePublicFileUpload(req.file);

        console.log("====================")
        console.log("====================")
        console.log("====================")
        console.log("====================")
        console.log("====================")
        console.log("====================")
        console.log("Server received the request to POST to /api/track")
        console.log("AWS responded with the URL", newTrackUrl);


        const newTrack = await Track.uploadNewTrack({
            url: newTrackUrl,
            trackName,
            userId,
        });

        //setTokenCookie(res, user);

        return res.json({
            newTrack,
        });
    })
);


/*
//=====================\\
||EXPORTS--------------||
\\=====================//
 */
module.exports = router;
