const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    categories: { type: Array, required: true }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)