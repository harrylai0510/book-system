var express = require('express');
var router = express.Router();

const Models = require('../models');
const jwtToken = require("jsonwebtoken");
const User = Models.User;

/* Login */
router.post('/login', async function (req, res, next) {
    const loginInfo = req.body;
    console.log(loginInfo)
    if (!loginInfo || !loginInfo.lemail || !loginInfo.password) {
        return;
    }

    let NeedToCheckDB = true;
    const reqToken = req.cookies.token;
    if (reqToken) {
        jwtToken.verify(reqToken, 'aaaa', function (err, decoded) {
            if (err) {
                NeedToCheckDB = true;
            } else {
                NeedToCheckDB = false;
                console.log("decoded", decoded);
            }
        });
    }

    if (NeedToCheckDB) {
        try {
            const user = await User.findOne({
                where: {
                    lemail: loginInfo.lemail,
                    password: loginInfo.password
                }
            })
            console.log(user)

            if (user) {
                const payload = {
                    id: user.id,
                    lemail: user.lemail
                }

                const token = jwtToken.sign(payload, "aaaa", {
                    expiresIn: "1d"
                })

                const EXPIRE_1D = 86400 * 1000;
                const EXPIRE_10S = 10 * 60 * 60;
                const cookieOptions = {
                    maxAge: EXPIRE_1D,
                    httpOnly: true,
                    secure: true,
                }

                console.log('in here')
                res.cookie("id", user.id, cookieOptions);
                res.cookie("token", token, cookieOptions);
                res.cookie("name", user.userName, cookieOptions);
                res.send({
                    userId: user.id,
                    userName: user.userName,
                    token: token
                })
            } else {
                res.send({
                    'msg': 'failed'
                })
            }
        } catch (e) {
            res.send({
                msg: 'failed to auth.',
                err: e.toString()
            })
        }
    } else {
        res.send({
            'msg': 'done1'
        })
    }
});

router.post('/logout', async function(req, res, next) {
    const cookieOptions = {
        maxAge: 0,
        httpOnly: true,
        secure: true,
    }
    res.cookie("token", '', cookieOptions);
    res.cookie("name", '', cookieOptions);

    res.send({
        msg: 'ok'
    })
})

module.exports = router;
