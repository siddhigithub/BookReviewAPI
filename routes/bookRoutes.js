const express = require('express');
const { addBook, getBooks, getBookById, searchBooks } = require('../controllers/bookController');
const auth = require('../middleware/Auth');
const verifyToken = require('../middleware/Auth');
const bookController = require('../controllers/bookController'); 
const { addReview } = require('../controllers/reviewController');

const router = express.Router();

router.post('/api/books', verifyToken, bookController.addBook);
router.post('/', auth, addBook);
router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);
router.post('/:id/reviews', auth, addReview);

module.exports = router;
