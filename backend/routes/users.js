const express = require('express');
const router = express.Router();
const log = require('../logger');
const Model = require('../models');
const Users = Model.User;

const DB_QUERY = {
    attributes: ['id', 'userName', 'firstName', 'lastName', 'lemail', 'password'],
    limit: 10
}

/* Creating a user info */
router.post('/', async function (req, res, next) {
    const userInfo = req.body;
    if (!userInfo || !userInfo.lemail) {
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
        log.error('failed to create a new user', e);
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
        log.error('failed to read users', e);
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
        log.error('failed to read user', e);
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

    try {
        const result = await Users.update(
            {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
            },
            {
                where: {
                    id: userId,
                },
            }
        );

        res.send({
            msg: `${result[0]} record(s) has been updated.`
        })
    } catch (e) {
        log.error('failed to update user', e);
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
        res.send({
            msg: `${result} record(s) has been deleted.`
        })
    } catch (e) {
        log.error('failed to delete user', e);
        res.send({
            "msg": "failed to delete user",
            "err": e.toString()
        })
    }
});

module.exports = router;
