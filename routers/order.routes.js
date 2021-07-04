const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller.js')
const middlewares = require('../middlewares/midlewares.js')

router.get('/', middlewares.middleLogin, orderController.getOrders)

router.get('/id/', middlewares.middleLoginUser, orderController.getOrdersById)

router.post('/', middlewares.middleLoginUser, orderController.createOrder)

router.put('/', middlewares.middlewareById, middlewares.middleLogin, orderController.updateOrder)

router.delete('/', middlewares.middlewareById, middlewares.middleLogin, orderController.deleteOrder)

module.exports = router;