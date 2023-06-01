const productController = require('../controllers/productController');
const { verifyTokenAndAdmin } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/createproduct', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)
module.exports =  router