/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();




/*
//=====================\\
||ROUTES---------------||
\\=====================//
 */
//            |||  /api/session |||
router.post('/', asyncHandler(async (req, res, next) => {
    //Get credentials from the request body
    const { credential, password } = req.body;

    //Check for user
    const user = await User.login({ credential, password });

        //If no user then generate error
        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['Your credentials are invalid. Please try again or create a new account.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);


/*
//=====================\\
||EXPORTS--------------||
\\=====================//
 */
module.exports = router;
