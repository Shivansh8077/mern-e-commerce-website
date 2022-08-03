const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter product price"],
        maxLength: [8, "Price cannot be more than 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"],
    },
    Stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "Stock cannot exceed 1000"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [ //this is an array
        // and every review will have the below format
        {
            user: { //it will have the id of the user who commented
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {  // it will have a name of the user who commented
                type: String,
                required: true
            },
            rating: { // a rating
                type: Number,
                required: true
            },
            comment: { //and the review itself
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Product", productSchema)