const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
  //Title, author, numberPages, publisher
  CustomerID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true
  },
  BookID: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true
  },
  initaialDate: {
    type: Date,
    require: true
  },
  deliveryDate: {
    type: Date,
    require: true
  }
  })

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;