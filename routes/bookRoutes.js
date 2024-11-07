const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.post('/books', async (req, res) => {
  const { title, author, genre, publishedYear, description } = req.body;

  try {
    const newBook = new Book({ title, author, genre, publishedYear, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publishedYear, description } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre, publishedYear, description }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
