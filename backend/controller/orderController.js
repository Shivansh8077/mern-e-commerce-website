const Order = require('../models/orderModel')
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')
const Product = require('../models/productModel')

// Create new Order
const newOrder = catchAsyncErrors(  (async function (req, res, next) {

    // let shippingInfo = req.body.shippingInfo
    // const orderItems = req.body.orderItems
    // const paymentInfo = req.body.paymentInfo
    // const itemsPrice = req.body.itemsPrice
    // const taxPrice = req.body.taxPrice
    // const shippingPrice = req.body.shippingPrice
    // const totalPrice = req.body.totalPrice

    const {shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })

}))

// Get single Order
const getSingleOrder = catchAsyncErrors(async function(req,res,next){

    const order = await Order.findById(req.params.orderId).populate("user","name email role");

    if(!order){
        return next(new ErrorHandler(`Order with id:${req.query.orderId} not found`,404))
    }
    res.status(201).json({
        success:true,
        order
    })


} )

// Get Logged in user Order
const myOrders = catchAsyncErrors(async function(req,res,next){

    const orders = await Order.find({user:req.user._id})
    if(!orders){
        return next(new ErrorHandler(`Order  not found`,404))
    }
    res.status(201).json({
        success:true,
        orders
    })


} )

// Get All Orders - Admin
const getAllOrders = catchAsyncErrors(async function(req,res,next){

    const orders = await Order.find()
    if(!orders){
        return next(new ErrorHandler(`Orders not found`,404))
    }
    let totalAmount = 0;
    orders.forEach(function (order){
        totalAmount+= order.totalPrice
    })

    res.status(201).json({
        success:true,
        totalAmount,
        orders
    })
} )

//  Update order status  - Admin
const updateOrder = catchAsyncErrors(async function(req,res,next){

    const order  = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler(`Orders not found`,404))
    }

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('This order has already been delivered to you',400))
    }

    order.orderItems.forEach(async function (item){
        await updateStock(item.product,item.quantity);
    })

    order.orderStatus = req.body.status;

    if(order.orderStatus === 'Delivered'){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false})
    res.status(201).json({
        success:true,

    })
} )

async function updateStock(productId,quantity){
    const product = await Product.findById(productId);
    product.Stock-= quantity;
    await product.save({validateBeforeSave:false})
}

//  Delete order  - Admin
const deleteOrder = catchAsyncErrors(async function(req,res,next){

    const order  = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler(`Orders not found`,404))
    }

    await order.remove();

    res.status(201).json({
        success:true,

    })
} )


module.exports = {newOrder,getSingleOrder,
    myOrders,getAllOrders,updateOrder,
    deleteOrder


}