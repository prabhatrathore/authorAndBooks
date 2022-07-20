const bookModel = require('../models/bookmodel')
const authorModel = require('../models/authorModel')

const createBook = async function (req, res) {
    try {
        //authorisation
        let id = req.body.authorId;
        let decodeId = req.authorId.userId;
        if (decodeId == id) {
            let authorData = await authorModel.findOne({ _id: id })
            if (authorData) {
                let body = req.body;
                let data = await bookModel.create(body);
                res.status(201).send({ status: true, data: data })
            }
        }
        else {
            res.status(400).send({ status: false, msg: 'authorisation failed' })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const fetchBooks = async function (req, res) {
    try {
        let getQuery = { isDeleted: false }
        let book = await bookModel.find(getQuery);
        if (book.length == 0) {
            res.status(404).send({ status: false, msg: "book not found!!" })
        }
        else {
            res.status(200).send({ status: true, msg: book })
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const updateBook = async function (req, res) {
    try {
        let decodeId = req.authorId.userId
        let bookId = req.params.bookId;
        let bookUser = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!bookUser) {
            return res.status(404).send({ status: false, msg: 'invalid book id or book is deleted' })
        }
        let authorId = bookUser.authorId;
        if (decodeId == authorId) {
            let id = req.params.bookId;
            let updatedValue = await bookModel.findOneAndUpdate({ _id: id, isDeleted: false }, {
                $set:
                {
                    bookName: req.body.bookName,
                    price: req.body.price,
                    updatedAt: Date.now()
                },
            }, { new: true })
            res.status(200).send({ status: true, data: updatedValue });
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const deleteById = async function (req, res) {
    try {
        let decodeId = req.authorId.userId
        let bookId = req.params.bookId;
        let bookUser = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!bookUser) {
            return res.status(404).send({ status: false, msg: 'invalid book id or this book already deleted ' })
        }
        let authorId = bookUser.authorId;
        if (decodeId == authorId) {
            await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { isDeleted: true, deletedAt: Date.now() }, { new: true })
            res.status(200).send({ status: true, msg: `${bookId} this book is deleted successfully` })
        }
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
const getBookByQuery = async function (req, res) {
    try {
        const queryParams = req.query;
        let book = await bookModel.find(queryParams);
        if (book.length == 0) {
            res.status(404).send({ status: false, data: "book not found for this author" })
        }
        else {
            res.status(200).send({ status: true, msg: book })
        };
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    };
};


module.exports.createBook = createBook;
module.exports.fetchBooks = fetchBooks;

module.exports.updateBook = updateBook;
module.exports.deleteById = deleteById;

module.exports.getBookByQuery = getBookByQuery;

