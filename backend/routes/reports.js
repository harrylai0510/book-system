var express = require('express');
var router = express.Router();

const sequelize = require('sequelize');
const Model = require('../models');
const Models = require("../models");
const Books = Model.Book;
const Users = Model.User;
const History = Model.History;

router.all('/', async function (req, res, next) {

    /* ================================================================ */
    let mostBookBorrow = await History.findAll({
        raw: true,
        attributes: [
            'bookId',
            [sequelize.fn('COUNT', 'bookId'), 'count']
        ],
        group: ['bookId'],
        include: [
            {
                model: Books,
                as: 'book',
                attributes: ['bookName']
            }
        ]
    });
    let bookNames = [];
    let bookCount = [];
    for (const book of mostBookBorrow) {
        bookNames.push(book['book.bookName']);
        bookCount.push(book.count);
    }
    /* ================================================================ */


    /* ================================================================ */
    let mostUserBorrow = await History.findAll({
        raw: true,
        attributes: [
            'userId',
            [sequelize.fn('COUNT', 'userId'), 'count']
        ],
        group: ['userId'],
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ['firstName', 'lastName']
            }
        ]
    });

    let userNames = [];
    let userCount = [];
    for (const user of mostUserBorrow) {
        userNames.push(`${user['user.firstName']} ${user['user.lastName']}`);
        userCount.push(user.count);
    }
    /* ================================================================ */


    res.send({
        mostBookBorrow: {
            bookNames,
            bookCount
        },
        mostUserBorrow: {
            userNames,
            userCount
        }
    });


});


module.exports = router;
