const express = require('express');
const routes = express.Router();
const productController = require('../controllers/products.controller.js')
const middlewares = require('../middlewares/midlewares.js')

routes.get('/', middlewares.middleLoginUser, productController.getProducts)

routes.post('/', middlewares.middleLogin, productController.createProduct)

routes.put('/',  middlewares.middlewareById, middlewares.middleLogin, productController.updateProduct)

routes.delete('/',  middlewares.middlewareById, middlewares.middleLogin, productController.deleteProduct)

module.exports = routes;