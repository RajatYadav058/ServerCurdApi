const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    public_id: String

})

const ProductModel = mongoose.model('product', ProductSchema)
module.exports = ProductModel