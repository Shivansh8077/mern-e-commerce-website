// This is a middleware 

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const token = req.cookies;
    // this token about is an object like
    //  {
    //   token: 'Some Token Value String'
    // }

    //So to access it we'll use token.token

    if (!token) {
        return next(new ErrorHandler('Please Login to Access this content', 401))
    }


    const decodedData = jwt.verify(token.token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id)

    next();
})

const authorizeRoles = function (role) {
    return (req, res, next) => {

        if(!(role==req.user.role)){
           return  next(new ErrorHandler(`Role: ${req.user.role} is not allowed to acces this content`,403))

        }

        next();
    }

}

module.exports = { isAuthenticatedUser, authorizeRoles };