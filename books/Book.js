const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
  //Title, author, numberPages, publisher
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  numberPages: {
    type: Number,
    require: false
  },
  publisher: {
    type: String,
    require: false
  }
  })

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;