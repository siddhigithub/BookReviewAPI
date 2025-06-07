const Book = require('../models/Book');
const Review = require('../models/Review');
exports.addBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};
exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = genre;
  const books = await Book.find(filter).skip((page - 1) * limit).limit(+limit);
  res.json(books);
};
exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('reviews');
  const averageRating = book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length || 0;
  res.json({ book, averageRating });
};
exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({
    $or: [
      { title: new RegExp(q, 'i') },
      { author: new RegExp(q, 'i') }
    ]
  });
  res.json(books);
};
