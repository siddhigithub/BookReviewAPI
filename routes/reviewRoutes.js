const express = require('express');
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const auth = require('../middleware/Auth');
const router = express.Router();
router.put('/:id', auth, updateReview);
router.post('/:id/reviews', auth, addReview);
router.delete('/:id', auth, deleteReview);
module.exports = router;