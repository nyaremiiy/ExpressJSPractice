const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
  code: String,
  source: String,
  short: String,
  date: {type : String, default : Date.now}
});

module.exports = mongoose.model('Link', linkSchema);