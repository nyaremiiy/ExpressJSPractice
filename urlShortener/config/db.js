const mongoose = require('mongoose');
const link = 'mongodb+srv://admin:admin@cluster0.2khjxgk.mongodb.net/links?retryWrites=true&w=majority';

mongoose.set("strictQuery", false);

const connectDb = () => {
  return mongoose.connect(link, {useNewUrlParser: true});
}

module.exports = connectDb;