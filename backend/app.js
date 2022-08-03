const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

//vid-time: 8:03:01
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const errorMiddleware = require('./middleware/error')

app.use(express.json());
app.use(cookieParser())

//Routes Imports

const productRoute = require('./routes/productRoute');

app.use('/api/v1',productRoute)

// Routes for Users

const userRoute = require('./routes/userRoute')

app.use('/api/v1',userRoute)

// MiddleWare for Error
app.use(errorMiddleware)

const orderRoute = require('./routes/orderRoute')

app.use('/api/v1',orderRoute)


module.exports = app;