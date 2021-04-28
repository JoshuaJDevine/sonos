/*
//=====================\\
||INIT-----------------||
\\=====================//
 */

const express = require('express')
const asyncHandler = require('express-async-handler');
const queries = require("../../utils/queries");
const {Sequelize} = require("sequelize");
const {singlePublicFileUpload} = require("../../awsS3");
const {singleMulterUpload} = require("../../awsS3");
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

        // console.log("====================")
        // console.log("====================")
        // console.log("====================")
        // console.log("====================")
        // console.log("====================")
        // console.log("====================")
        // console.log("Server received the request to POST to /api/track")
        // console.log("AWS responded with the URL", newTrackUrl);

        const newTrack = await Track.uploadNewTrack({
            url: newTrackUrl,
            trackName,
            userId,
        });

        return res.json({
            newTrack,
        });
    })
);

router.get('/:trackId/:userId/like', asyncHandler(async (req, res) => {
    const likes = await queries.findTrackLikes(req.params.trackId, req.params.userId);
    return res.json(
        {likes}
    );
}))
router.post('/:trackId/:userId/like',  asyncHandler(async (req, res) => {
        return res.json(
            {like: await queries.updateTrackLike(req.params.trackId, req.params.userId)}
        );
    }
))
router.get('/random', asyncHandler(async (req, res) => {
    let count;

    await Track.count().then(c => {
        console.log("There are " + c + " tracks!");
        count = c + 9;
    })



    let randNums = []
    for (let i = 0; i < 10; i++) {
        let rand = Math.floor(Math.random() * count);
        while (randNums.includes(rand)){
            rand = Math.floor(Math.random() * count);
        }
        randNums.push(rand);
    }
    console.log(randNums);
   const randTracks = await Track.findAll({
       where: {
           id: randNums
       }
   });

    return res.json(
        {randTracks}
    );
}))

/*
//=====================\\
||EXPORTS--------------||
\\=====================//
 */
module.exports = router;
