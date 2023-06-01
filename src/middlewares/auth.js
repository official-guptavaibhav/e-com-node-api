const jwt = require('jsonwebtoken');
const apiMessages = require('../config/apiMessages');

const verifyToken =  (req, res, next) => {
    const authHeader = req.headers.token
    if(!authHeader){
        return res.status(401).json({
            status: false,
            message: apiMessages.unauthorized_user
        })
    }
    jwt.verify(token, process.env.JWT_KEY,(err, user)=>{
        if(err){
            res.status(403).json({
                status: false,
                message: apiMessages.invalid_token
            })
        }
        req.user = user;
        next();
    })
}

const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, () =>{
        if(req.user.id === req.params.id || isAdmin ){
            next();
        }else {
            res.status(403).json({
                status: false,
                message: apiMessages.unauthorized_user
            })
        }
    });
}

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, () =>{
        if(req.user.isAdmin){
            next();
        }else {
            res.status(403).json({
                status: false,
                message: apiMessages.unauthorized_user
            })
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}