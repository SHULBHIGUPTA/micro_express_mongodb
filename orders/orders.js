//load express
const express = require("express");
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json())
//load mongoose
const mongoose = require("mongoose");

require("./Order")
const Order = mongoose.model("Order")

//connect
mongoose.connect('mongodb://localhost/booksservice');
mongoose.Promise = global.Promise;


app.post('/order', (req, res) => {
    var newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
          BookID: mongoose.Types.ObjectId(req.body.BookID),
          initaialDate: req.body.initaialDate,
          deliveryDate: req.body.deliveryDate
    }
    //create a new order
    var order = new Order(newOrder)
    order.save().then(() => {
        res.send("Order create with success")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send("a new order creates success")
})
app.get('/orders', (req, res)=>{
    Order.find().then((order) => {
        res.json(OverconstrainedError)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})
app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id).then((order)=>{
     if(order){
         axios.get("http://localhost:5555/customer/" + order.CustomerID).then((response) => {
            var orderObject = {customerName: response.data.name, bookTitle: ''}
       
         axios.get("http://localhost:4545/book/" + order.BookID).then((response) => {
            orderObject.bookTitle = response.data.title
            res.json(orderObject)
         })
        })
     }else {
         res.send("Invalid order")
     }
    }).catch(err => {
     if(err){
      throw err;
     }
    })
 })

app.listen(7777,()=> {
    console.log("Up and running! -- This is our Books service");
})