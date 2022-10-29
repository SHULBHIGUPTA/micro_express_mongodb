//load express
const express = require("express");
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
//load mongoose
const mongoose = require("mongoose");

require("./Book")
const Book = mongoose.model("Book")

//connect
mongoose.connect('mongodb://localhost/booksservice');
mongoose.Promise = global.Promise;

// app.get('/', (req, res) => {
//     res.send("this is our main endpoint");
// })
app.get('/book/:id', (req, res) => {
   Book.findById(req.params.id).then((book)=>{
    if(book){
        res.json(book)
    }else {
        res.sendStatus(404)
    }
   }).catch(err => {
    if(err){
     throw err;
    }
   })
})
app.post('/book', (req, res) => {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }
    //create a new Book 
    var book = new Book(newBook)
    book.save().then(() => {
        console.log("new book created!")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send("a new book creates success")
    // console.log(req.body)
    // res.send("Testing our book route!")
})
app.delete('/book/:id', (req, res, next) => {
    //console.log(req.params.id);
    Book.findByIdAndRemove({_id: req.params.id}).then(() => {
        res.send("Book removed with success!")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.listen(4545,()=> {
    console.log("Up and running! -- This is our Books service");
})