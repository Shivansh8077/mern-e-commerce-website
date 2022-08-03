const ErrorHandler = require('../utils/errorhandler')

module.exports = (err, req, res, next) => {


    err.status = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';



    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message = `Resource not found .Invalid: ${err.path}`;
        err = new ErrorHandler(message, 480);
    }

    // Wrong duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400);

    }

    // Wrong JWT  error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token Expired`
        err = new ErrorHandler(message, 400);

    }

    // Wrong EXPIRE  error
    if (err.name === "jsonWebTokenError") {
        const message = `Json Web Token Invalid`
        err = new ErrorHandler(message, 400);

    }
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 500;

    console.log('err.status', err.status)
    console.log('err.statusCode', err.statusCode)
    console.log('err.message', err.message)
    console.log('err', err)

    if (err.statusCode) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.stack
        });
    } else {
        res.status(err.status).json({
            success: false,
            message: err.message,
            error: err.stack
        });

    }
}