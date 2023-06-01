const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const apiMessages = require('../config/apiMessages');

const signUp = async (req, res) => {
    let responseData;
    try {
        const password = req.body.password
        const hashPassword = await argon2.hash(password)
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })
        responseData = res.status(201).json({
            status: true,
            message: apiMessages.signup_success,
            data: {
                user: newUser.username,
                email: newUser.email
            },
        })
    } catch (err) {
        responseData = res.status(500).json(err);
    }
    return responseData
}

const logIn = async (req, res) => {
    let email = req.body.email
    try {
        const getUser = await User.findOne({ email: email })
        // const password = req.body.password
        if (!getUser) {
            return res.json({
                status: false,
                message: apiMessages.email_not_found
            })
        }
        const isPasswordValid = await argon2.verify(getUser.password, req.body.password)
        if (!isPasswordValid) {
            return res.json({
                status: false,
                message: apiMessages.invalid_password
            })
        }
        const accessToken = jwt.sign({
            id: getUser._id,
            isAdmin: getUser.isAdmin
        }, process.env.JWT_KEY,
            { expiresIn: "300s" });
        return res.json({
            status: true,
            message: apiMessages.login_success,
            Token : accessToken
        })
    } catch (err) {
        console.log(err.message);;
    }

}
// export default authController
module.exports = { signUp, logIn }