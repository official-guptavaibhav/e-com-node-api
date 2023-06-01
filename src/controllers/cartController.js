const express = require('express');
const Cart = require('../models/cartModel');
const apiMessages = require('../config/apiMessages');

const createCart = async(req, res)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save()
        res.status(200).json({
            status: true,
            message: apiMessages.create_cart,
            product : savedCart
                })

    }catch(err){
        console.log(err.message);
    }
}

const updateCart = async(req,res)=>{
    try{
    const updadtedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
            $set : req.body,
        },
        { new: true }
    );
    res.status(200).json({
        status: true,
        message: apiMessages.update_cart,
        product: updadtedCart
    })
}catch(err){
    console.log(err.messsage)
}
}
const deleteCart = async(req,res)=>{
    try{
    const deleteCart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: true,
        message: apiMessages.delete_cart,
    })
}catch(err){
    console.log(err.messsage)
}
}
// export default cartController
module.exports = { createCart, updateCart, deleteCart}