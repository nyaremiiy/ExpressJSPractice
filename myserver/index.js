const express = require('express');
const booksRouter = express.Router();

const app = express();

const products = ['apple', 'pen', 'computer'];

app.use((req, res, next) => { //For each route
  console.log('Date:', new Date(), 'Method:', req.method, 'URL:', req.url, 'Ip:', req.ip);
  next();
});

// app.use(express.static('public')); //http://localhost:5000/books.html
app.use('/static',express.static(__dirname + '/public')); //http://localhost:5000/static/books.html

app.get('/', (req, res, next) => {
  res.send('Its working!!!');
});

app.get('/products', (req, res, next) => {
  // res.send(products);
  // console.log('Page number: ', req.query.page); //http://localhost:5000/products?page=0 
  res.json({products})
});

app.get('/products/:id', (req, res, next) => {
  if(products[req.params.id]) {
    res.send(products[req.params.id]);
  }else {
    res.status(403).send('Product not found');
  }
});

booksRouter.get('/', (req, res, next) => {
  res.send('Books!!!');
});

booksRouter.get('/about', (req, res, next) => {
  res.send('About books...');
});

app.get('/blog', (req, res, next) => {
 // res.redirect('https://www.youtube.com/'); // http://localhost:5000/blog -> https://www.youtube.com/
  // 301-301 status
  res.redirect(301, '/'); // http://localhost:5000/blog -> http://localhost:5000/ status 301
});

app.get('/download-books', (req, res, next) => {
  res.download('./public/books.html', 'anotherNameFile.html', (err) => {
    if(err) {
      console.log('Err: ', err);
    }else {
      console.log('File sent!');
    }
  });
});

app.use('/books', booksRouter); //http://localhost:5000/books/...['/', '/about']

app.use((err, req, res, next) => {
  console.log('Errors:', err.stack);
  res.status(500).send(err.stack);
});

app.listen(5000, () => {
  console.log('Its started', new Date());
});