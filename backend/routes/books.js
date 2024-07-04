var express = require('express');
var router = express.Router();

const Model = require('../models');
const Books = Model.Book;

const DB_QUERY = {
    attributes: ['id', 'bookName'],
    limit: 10
}

/* Creating a book info */
router.post('/', async function (req, res, next) {
    const bookInfo = req.body;
    if (!bookInfo || !bookInfo.bookName) {
        res.send({
            "msg": "Not enough info to create a book. (Book/Create)"
        })
    }

    try {
        const result = Books.build(bookInfo);
        await result.save();

        res.send({
            "msg": `created a book info (book id: ${result.dataValues.id})`,
        });
    } catch (e) { 
        console.log(e)
        res.send({
            "msg": "failed to create a new book",
            "err": e.toString()
        })
    }
});

/* Read a list of book */
router.get('/', async function (req, res, next) {
    try {
        const BooksList = await Books.findAll(DB_QUERY) || [];
        res.send(BooksList);
    } catch (e) {
        res.send({
            "msg": "failed to read books",
            "err": e.toString()
        })
    }
});

/* Read a book info */
router.get('/:bookId', async function (req, res, next) {
    const bookId = req.params.bookId;
    if (!bookId) {
        res.send({
            "msg": "Not enough info to read a book. (Book/Read)"
        })
    }

    try {
        const STATEMENT = {...DB_QUERY, where: {id: bookId}};
        const Book = await Books.findOne(STATEMENT) || {};
        res.send(Book);
    } catch (e) {
        res.send({
            "msg": "failed to read book",
            "err": e.toString()
        })
    }
});

/* Update a book info */
router.put('/:bookId', async function (req, res, next) {
    const bookId = req.params.bookId;
    const bookInfo = req.body;
    if (!bookId) {
        res.send({
            "msg": "Not enough info to update a book. (Book/Update1)"
        })
    }
    if (!bookInfo || !bookInfo.bookName) {
        res.send({
            "msg": "Not enough info to update a book. (Book/Update2)"
        })
    }

    try {
        const result = await Books.update(
            {bookName: bookInfo.bookName},
            {
                where: {
                    id: bookId,
                },
            }
        );

        console.log(result);
        res.send({
            msg: `${result[0]} record(s) has been updated.`
        })
    } catch (e) {
        res.send({
            "msg": "failed to update book",
            "err": e.toString()
        })
    }
});

/* Delete a book info */
router.delete('/:bookId', async function (req, res, next) {
    const bookId = req.params.bookId;
    if (!bookId) {
        res.send({
            "msg": "Not enough info to delete a book. (Book/Delete)"
        })
    }

    try {
        const result = await Books.destroy({
            where: {
                id: bookId,
            },
        })
        console.log(result);
        res.send({
            msg: `${result} record(s) has been deleted.`
        })
    } catch (e) {
        res.send({
            "msg": "failed to delete book",
            "err": e.toString()
        })
    }
});

module.exports = router;
