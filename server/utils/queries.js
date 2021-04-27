const { User, Track, Like, Comment, Playlist } = require('../db/models');
const queries = {};

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
    const track = await User.findByPk(trackId, {
        include: Comment,
    });
    return track;
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
