const { User, Track, Like, Comment, Playlist } = require('../db/models');
const queries = {};
const { Op } = require('sequelize');


//SEQUELIZE TESTS
queries.findUserbyID = async function findUserbyID(userId) {
    const user = await User.findByPk(userId);
    return user;
}
queries.findUserTracks = async function findUserTracks(userId){
    const user = await User.findByPk(userId, {
        include: Track,
    });
    return user;
}
// async function findUserComments(userID){
//     const user = await User.findByPk(userId, {
//         include: Comment,
//     });
// }
// async function findUserPlaylists(userID){
//     const user = await User.findByPk(userId, {
//         include: Playlist,
//     });
// }
// async function findUserLikes(userID){
//     const user = await User.findByPk(userId, {
//         include: Like,
//     });
// }
queries.findTrackComments = async function findTrackComments(trackId){
    const track = await Track.findByPk(trackId,
        {    include: [
                { model : Comment ,
                    include: {
                        model : User
                    },
                    where: {trackId: trackId}
                }
            ]}
    );
    return track;
}

queries.findTrackLikes = async function findTrackLikes(trackId, userId){
    //Find like where the trackId and the userId match the params
    const like = await Like.findOne({where: { userId: userId, trackId: trackId}})
    return like;
}
queries.updateTrackLike = async function findTrackLikes(trackId, userId){
    //Find like where the trackId and the userId match the params
    const like = await Like.findOne({where: { userId: userId, trackId: trackId}})

    console.log("==================LIKE WAS:")
    console.log(like)

    //If there is a like, delete it. Else, create it.
    if (like != null) {
        await like.destroy();
        return "Destroyed!! What else is there to return? Probably something I don't remember atm..."
    }
    else {
        await Like.createNewLike(userId, trackId );
        const like = await Like.findOne({where: { userId: userId, trackId: trackId}})
        console.log("==================NEW LIKE WAS:")
        console.log(like)
        return like;
    }
}


// const user = await User.findByPk(userId);


//
// Track.create({
//     userId: 1,
//     url: 'http:/aws.track.com'
// }).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err)
// })
//
// Playlist.create({
//     name: 'test',
//     isPrivate: false
// }).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err)
// })
//
// lookupUser(1).then((res) => {
//     console.log('=========sequelize test===========')
//     console.log(res.dataValues.username, ' is associated with', res.Tracks.length, 'tracks');
//     console.log('This is a great success!');
//     console.log('the tracks are: ')
//     res.Tracks.forEach((el) => {console.log(el.dataValues.url)})
//     //Test;
//     //Test
// });



/*
//=====================\\
||EXPORTS--------------||
\\=====================//
 */
// module.exports = 'boo';
module.exports = queries;
