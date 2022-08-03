const express = require('express')
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController");
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:orderId').get(isAuthenticatedUser, getSingleOrder)
router.route('/orders/me').get(isAuthenticatedUser, myOrders)
router.route('/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders)
router.route('/admin/updateOrder/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)

router.route('/admin/deleteOrder/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)


module.exports = router;