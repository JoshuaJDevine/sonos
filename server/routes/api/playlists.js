/*
//=====================\\
||INIT-----------------||
\\=====================//
 */

const express = require('express')
const asyncHandler = require('express-async-handler');
const { Comment, User, Track, Like, Playlist } = require('../../db/models');
const queries = require("../../utils/queries");
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



/*
//=====================\\
||Validation Middleware||
\\=====================//
 */
const validatePlaylist = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a name'),
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

//api/playlist/
router.post('/', asyncHandler(async (req, res) => {
    const { name, isPrivate, userId} = req.body;

    const myUser = await User.findByPk(userId);

    const newPlaylist = await Playlist.create({
        name,
        isPrivate,
    });

    const userAdd = await newPlaylist.addUser(myUser);

    return res.json({
        newPlaylist, userAdd
    });
}))

//api/playlist/addTrack/:trackId
router.post('/addTrack/:trackId/:playlistId/', asyncHandler(async (req, res) => {
    const { trackId, playlistId} = req.params;

    const myPlaylist = await Playlist.findByPk(playlistId);
    const myTrack = await  Track.findByPk(trackId)


    const addTrackToPlaylist = await myTrack.addPlaylist(myPlaylist);

    return res.json({
        addTrackToPlaylist
    });
}))

//api/playlist/:userId
router.get('/:userId', asyncHandler(async (req, res) => {
    const usersPlaylists = await User.findByPk(req.params.userId, {
        include: [{
            model: Playlist,
            include: [{ model: Track}]
        }]
    })

    return res.json({
        usersPlaylists
    });
}))



/*
//=====================\\
||EXPORTS--------------||
\\=====================//
 */
module.exports = router;

















