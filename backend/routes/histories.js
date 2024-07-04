var express = require('express');
var router = express.Router();

const Models = require('../models');
const Histories = Models.History;

const DB_QUERY = {
    attributes: ['id', 'user.userName', 'book.bookName'],
    limit: 10
}

/* Creating a history info */
router.post('/', async function (req, res, next) {
    const historyInfo = req.body;
    if (!historyInfo || !historyInfo.bookId || !historyInfo.userId) {
        res.send({
            "msg": "Not enough info to create a history. (History/Create)"
        })
    }

    try {
        const result = History.build(historyInfo);
        await result.save();

        res.send({
            "msg": `created a history info (history id: ${result.dataValues.id})`,
        });
    } catch (e) {
        console.log(e)
        res.send({
            "msg": "failed to create a new history",
            "err": e.toString()
        })
    }
});

/* Read a list of history */
router.get('/', async function (req, res, next) {
    try {
        const HistoriesList = await Histories.findAll({
            ...DB_QUERY,
            include: [
                {
                    model: Models.User,
                    as: 'user',
                    attributes: ['userName']
                },
                {
                    model: Models.Book,
                    as: 'book',
                    attributes: ['bookName']
                }]
        }) || [];

        res.send(HistoriesList);
    } catch (e) {
        res.send({
            "msg": "failed to read history",
            "err": e.toString()
        })
    }
});

/* Read a history */
router.get('/:historyId', async function (req, res, next) {
    const historyId = req.params.historyId;
    if (!historyId) {
        res.send({
            "msg": "Not enough info to read a history. (History/Read)"
        })
    }

    try {
        const STATEMENT = {
            ...DB_QUERY,
            where: {id: historyId},
            include: [
                {
                    model: Models.User,
                    as: 'user',
                    attributes: ['userName']
                },
                {
                    model: Models.Book,
                    as: 'book',
                    attributes: ['bookName']
                }]
        };
        const History = await Histories.findOne(STATEMENT) || {};
        res.send(History);
    } catch (e) {
        console.log(e)
        res.send({
            "msg": "failed to read history",
            "err": e.toString()
        })
    }
});

/* Update a history */
// router.put('/:historyId', async function (req, res, next) {
//     const historyId = req.params.historyId;
//     const bookInfo = req.body;
//     if (!bookId) {
//         res.send({
//             "msg": "Not enough info to update a book. (Book/Update1)"
//         })
//     }
//     if (!bookInfo || !bookInfo.bookName) {
//         res.send({
//             "msg": "Not enough info to update a book. (Book/Update2)"
//         })
//     }
//
//     try {
//         const result = await Books.update(
//             {bookName: bookInfo.bookName},
//             {
//                 where: {
//                     id: bookId,
//                 },
//             }
//         );
//
//         console.log(result);
//         res.send({
//             msg: `${result[0]} record(s) has been updated.`
//         })
//     } catch (e) {
//         res.send({
//             "msg": "failed to update book",
//             "err": e.toString()
//         })
//     }
// });

/* Delete a history */
router.delete('/:historyId', async function (req, res, next) {
    const historyId = req.params.historyId;
    if (!historyId) {
        res.send({
            "msg": "Not enough info to delete a history. (History/Delete)"
        })
    }

    try {
        const result = await Histories.destroy({
            where: {
                id: historyId,
            },
        })
        console.log(result);
        res.send({
            msg: `${result} record(s) has been deleted.`
        })
    } catch (e) {
        res.send({
            "msg": "failed to delete history",
            "err": e.toString()
        })
    }
});

module.exports = router;
