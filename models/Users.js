const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: String,
    password: String,
    role: {type:String, default:"user"}
});

module.exports = mongoose.model('Product', productSchema);