const express = require('express');
const Product = require('../models/productModel');
const apiMessages = require('../config/apiMessages');

const createProduct = async(req, res)=>{
    const newProduct = new Product(req.body);
    try{
        const savedProduct = await newProduct.save()
        res.status(200).json({
            status: true,
            message: apiMessages.create_product,
            product : savedProduct
        })

    }catch(err){
        console.log(err.message);
    }
}

const updateProduct = async(req,res)=>{
    try{
    const updadtedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            $set : req.body,
        },
        { new: true }
    );
    res.status(200).json({
        status: true,
        message: apiMessages.update_product,
        product: updadtedProduct
    })
}catch(err){
    console.log(err.messsage)
}
}
const deleteProduct = async(req,res)=>{
    try{
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: true,
        message: apiMessages.delete_product,
    })
}catch(err){
    console.log(err.messsage)
}
}

// export default productController
module.exports = { createProduct, updateProduct, deleteProduct}