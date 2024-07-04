var express = require('express');
var router = express.Router();

const Model = require('../models');
const Users = Model.User;

const DB_QUERY = {
    attributes: ['id', 'userName'],
    limit: 10
}

/* Creating a user info */
router.post('/', async function (req, res, next) {
    const userInfo = req.body;
    if (!userInfo || !userInfo.userName) {
        res.send({
            "msg": "Not enough info to create a user. (User/Create)"
        })
    }

    try {
        const result = Users.build(userInfo);
        await result.save();

        res.send({
            "msg": `created a user info (user id: ${result.dataValues.id})`,
        });
    } catch (e) {
        res.send({
            "msg": "failed to create a new user",
            "err": e.toString()
        })
    }
});

/* Read a list of user */
router.get('/', async function (req, res, next) {
    try {
        const UserList = await Users.findAll(DB_QUERY) || [];
        res.send(UserList);
    } catch (e) {
        res.send({
            "msg": "failed to read users",
            "err": e.toString()
        })
    }
});

/* Read a user info */
router.get('/:userId', async function (req, res, next) {
    const userId = req.params.userId;
    if (!userId) {
        res.send({
            "msg": "Not enough info to read a user. (User/Read)"
        })
    }

    try {
        const STATEMENT = {...DB_QUERY, where: {id: userId}};
        const User = await Users.findOne(STATEMENT) || {};
        res.send(User);
    } catch (e) {
        res.send({
            "msg": "failed to read user",
            "err": e.toString()
        })
    }
});

/* Update a user info */
router.put('/:userId', async function (req, res, next) {
    const userId = req.params.userId;
    const userInfo = req.body;
    if (!userId) {
        res.send({
            "msg": "Not enough info to update a user. (User/Update1)"
        })
    }
    if (!userInfo || !userInfo.userName) {
        res.send({
            "msg": "Not enough info to update a user. (User/Update2)"
        })
    }

    try {
        const result = await Users.update(
            {userName: userInfo.userName},
            {
                where: {
                    id: userId,
                },
            }
        );

        console.log(result);
        res.send({
            msg: `${result[0]} record(s) has been updated.`
        })
    } catch (e) {
        res.send({
            "msg": "failed to update user",
            "err": e.toString()
        })
    }
});

/* Delete a user info */
router.delete('/:userId', async function (req, res, next) {
    const userId = req.params.userId;
    if (!userId) {
        res.send({
            "msg": "Not enough info to delete a user. (User/Delete)"
        })
    }

    try {
        const result = await Users.destroy({
            where: {
                id: userId,
            },
        })
        console.log(result);
        res.send({
            msg: `${result} record(s) has been deleted.`
        })
    } catch (e) {
        res.send({
            "msg": "failed to delete user",
            "err": e.toString()
        })
    }
});

module.exports = router;
