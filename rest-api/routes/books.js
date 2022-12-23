const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let books = [{
  id : 1,
  author : 'Jonh Doe',
  title : 'Javascript' 
}];

router.get('/', (req, res, next) => {
  res.json(books);
});

router.get('/:id', (req, res, next) => {
  const bookId = parseInt(req.params.id, 10);

  const book = books.find(book => book.id === bookId);

  if(book) {
    return res.send(book);
  }
  
  return res.status(404).json({
    status : `Book width id: ${bookId} not found :(` 
  })
})

router.post('/', (req, res, next) => {

  const book = {
    title : req.body.title || 'Default title',
    author : req.body.author || 'Default author',
    id : uuidv4()
  }
  
  books.push(book);

  return res.json(book);
})

router.put('/:id', (req, res, next) => {
  const bookId = parseInt(req.params.id, 10);

  books.forEach( book => {
    if(book.id === bookId) {
      book.title = req.body.title;
      book.author = req.body.author;
    } 
  });

  const changedBook = books.find(book => book.id === bookId);

  return res.json(changedBook);
  
});

router.delete('/:id', (req, res, next) => {
  const bookId = parseInt(req.params.id, 10);

  books = books.filter(book => book.id !== bookId);

  const existBook = books.find(book => book.id === bookId);

  if(!existBook) {
    return res.status(200).send(`Book with id: ${bookId} was deleted.`);
  }else {
    return res.status(404).send(`Something wrong.`);
  }
})

module.exports = router;