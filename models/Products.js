
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
 
    name: String,
    price: Number,
    sdt: Number,
    productimage: {type:String,required:true}

 
});

const Product = mongoose.model('product1', productSchema);
module.exports = Product; //

