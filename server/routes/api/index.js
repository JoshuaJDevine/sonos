/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');


/*
//=====================\\
||TEST ROUTES----------||
\\=====================//
 */
//Test POST route
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

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
