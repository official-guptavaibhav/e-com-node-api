const router = require('express').Router();
const cartController = require('../controllers/cartController')

router.post('/', cartController.createCart)
router.put('/cart/:id', cartController.updateCart)
router.delete('/cart/:id', cartController.deleteCart)
module.exports =  router