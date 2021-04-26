/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const  trackRouter = require('./track.js')

//todo add routes for track crud


/*
//=====================\\
||SETUP----------------||
\\=====================//
 */
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/track', trackRouter);




/*
//=====================\\
||TEST ROUTES----------||
\\=====================//
 */
//Test POST route
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });

//Imports to test auth flow
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
//Test Auth flow - token
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'LudwigB'
//         },
//     })
//     setTokenCookie(res, user);
//     return res.json({ user });
// }));

//Test Auth flow - restore user
// router.get(
//     '/restore-user',
//     restoreUser,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

//Test Auth flow - require auth
// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );




/*
//=====================\\
||EXPORTS--------------||
\\=====================//
 */
module.exports = router;
