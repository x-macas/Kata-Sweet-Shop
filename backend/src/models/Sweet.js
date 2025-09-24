const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
  name: { type:String, required:true, unique:true },
  category: { type:String, required:true },
  price: { type:Number, required:true },
  quantity: { type:Number, required:true, min:0 }
}, { timestamps:true });

module.exports = mongoose.model('Sweet', sweetSchema);
