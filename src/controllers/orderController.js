const express = require('express');
const Order = require('../models/orderModel');
const apiMessages = require('../config/apiMessages');

const createOrder = async(req, res)=>{
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save()
        res.status(200).json({
            status: true,
            message: apiMessages.create_order,
            product : savedOrder
                })

    }catch(err){
        console.log(err.message);
    }
}

const updateOrder = async(req,res)=>{
    try{
    const updadtedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
            $set : req.body,
        },
        { new: true }
    );
    res.status(200).json({
        status: true,
        message: apiMessages.update_order,
        product: updadtedOrder
    })
}catch(err){
    console.log(err.messsage)
}
}
const deleteOrder = async(req,res)=>{
    try{
    const deleteOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: true,
        message: apiMessages.delete_order,
    })
}catch(err){
    console.log(err.messsage)
}
}
// export default cartController
module.exports = { createOrder, updateOrder, deleteOrder}