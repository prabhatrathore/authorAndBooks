const express = require('express');
const AuthorController = require('../controllers/authorController')
const Midd = require("../middleware/authMiddleware")
const BookController = require("../controllers/bookController")

const router = express.Router();

router.post("/authors", AuthorController.createAuthor)//q1
router.post("/login", AuthorController.login)   //q2


router.post("/book", Midd.middleWare, BookController.createBook)//q3
router.get("/getBook", BookController.fetchBooks)//q4

router.put("/books/:bookId", Midd.middleWare, BookController.updateBook)

router.delete("/books/:bookId", Midd.middleWare, BookController.deleteById)
router.get("/getBookByQuery", BookController.getBookByQuery)//q4



module.exports = router;
