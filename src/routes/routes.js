const express = require("express");
const router = express.Router(); //used express to create route handlers
//import controllers
const aws= require("aws-sdk")

const userControllers = require("../controllers/userControllers");
const bookControllers = require("../controllers/bookControllers");
const reviewControllers = require("../controllers/reviewController");
const middleware = require('../middlewares/common')




//User API's
router.post("/register", userControllers.createUser);
router.post("/login", userControllers.loginUser);

//Book API's
router.post("/books",middleware.authentication, bookControllers.createBook);
router.get("/books",middleware.authentication, bookControllers.getBook);
router.get("/books/:bookId",middleware.authentication, bookControllers.getBookDetails);
router.put("/books/:bookId",middleware.authentication,middleware.authorization, bookControllers.updateBook);
router.delete("/books/:bookId",middleware.authentication,middleware.authorization, bookControllers.deleteBook);

//review API's
router.post("/books/:bookId/review",middleware.authentication,middleware.authorization, reviewControllers.createReview)
router.put("/books/:bookId/review/:reviewId",middleware.authentication,middleware.authorization, reviewControllers.updateReview)
router.delete("/books/:bookId/review/:reviewId",middleware.authentication,middleware.authorization, reviewControllers.deleteReview)

module.exports = router;
