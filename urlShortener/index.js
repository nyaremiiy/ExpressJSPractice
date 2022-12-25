const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000 || process.env.PORT;

const connectDb = require('./config/db');

const indexRoutes = require('./routes/index');
const linkRoutes = require('./routes/links');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(indexRoutes);
app.use('/links', linkRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Serevr is started on port: ${PORT}`);
  });
}).catch((err) => {
  console.log('Errors: ', err);
})
