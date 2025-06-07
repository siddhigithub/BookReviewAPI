const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReview = async (req, res) => {
  const existing = await Review.findOne({ book: req.params.id, user: req.user._id });
  if (existing) return res.status(400).json({ message: 'Review already exists' });
  const review = await Review.create({ book: req.params.id, user: req.user._id, ...req.body });
  await Book.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } });
  res.status(201).json(review);
};
exports.updateReview = async (req, res) => {
  const review = await Review.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
};
exports.deleteReview = async (req, res) => {
  const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!review) return res.status(404).json({ message: 'Review not found' });
  await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
  res.json({ message: 'Deleted successfully' });
};