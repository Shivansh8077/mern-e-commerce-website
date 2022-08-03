const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apifeatures')
const cloudinary = require('cloudinary');

// Creating Product -- Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
        let images = [];
        if( typeof req.body.images==='string'){
            images.push(req.body.images)
        }else {
            images = req.body.images
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.images = imagesLinks;
        req.body.user = req.user.id;

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            custom_message: "A product has been created successfully",
            product
        })

    }
);

// Get All Products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
        // return next(new ErrorHandler(`My custom error`, 500))

        const resultPerPage = 8;
        const productCount = await Product.countDocuments();

        const apifeatures = new ApiFeatures(Product.find(), req.query).
        search()
            .filter()
            .pagination(resultPerPage)

        const products = await apifeatures.query
        let filteredProductsCount = products.length;


        // console.log('products', products.length)
        // apifeatures.pagination(resultPerPage)

        // products = await apifeatures.query
        if (!products) {
            //next fn means it would excecute the code within it first then only it will move to further execution of the program, it's called a middleware
            // return next(new ErrorHandler(`No Product Found`, 404))
        } else {
            res.status(200).json({
                message: "Route is working fine (from ProductController.js)",
                "custom-message": "Hey buddy, good job",
                products,
                productCount,
                resultPerPage,
                filteredProductsCount
            })
        }
    }
)

// Get All Product (Admin)
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get A Product Details
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            //next fn means it would excecute the code within it first then only it will move to further execution of the program, it's called a middleware
            return next(new ErrorHandler(`No Product with id = ${req.params.id} found to DISPLAY`, 404))

            // res.status(500).json({
            //     success: false,
            // //     custom_msg: `No Product with id = ${req.params.id} found to DISPLAY`
            // })
        } else {
            res.status(200).json({
                message: "Product found",
                product
            })

        }

    }
)


// Update Product -- Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
        let product = await Product.findById(req.params.id);
        if (!product) {
            //next fn means it would excecute the code within it first then only it will move to further execution of the program, it's called a middleware
            return next(new ErrorHandler(`No Product with id = ${req.params.id} found to DISPLAY`, 404))
        } else {
            // Images Start Here
            let images = [];

            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }

            if (images !== undefined) {
                // Deleting Images From Cloudinary
                for (let i = 0; i < product.images.length; i++) {
                    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
                }

                const imagesLinks = [];

                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.v2.uploader.upload(images[i], {
                        folder: "products",
                    });

                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                }

                req.body.images = imagesLinks;
            }
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
        }
        res.status(200).json({
            message: "/update is working fine",
            product
        })

    }
)

// Delete Product -- Admin
const deleteProduct = catchAsyncErrors(async (req, res, next) => {

        let product = await Product.findById(req.params.id);


        if (!product) {
            //next fn means it would excecute the code within it first then only it will move to further execution of the program, it's called a middleware
            return next(new ErrorHandler(`No Product with id = ${req.params.id} found to DISPLAY`, 404))
        } else {
            // Deleting Images From Cloudinary
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }

            await product.remove();
            res.status(200).json({
                message: "/delete is working fine",
                "The Deleted Product is ": product
            })
        }
    }
)

// Create a review or Update a Review

const createProductReview = catchAsyncErrors(async (req, res, next) => {
        const review = {
            user: req.user._id,      // automatically fetched from req
            name: req.user.name,    // automatically fetched from req
            rating: Number(req.body.rating), // get this value from body i.e form
            comment: req.body.comment
        }

        const productId = req.body.productId;

        const product = await Product.findById(productId);


        if (!product) {
            return next(new ErrorHandler(`No product with id:${req.body.productId} found`, 201))
        }
        // let isReviewed1 = "";
        // product.reviews.forEach(function (rev) {
        //     console.log('rev.user - req.user._id', rev.user, req.user._id, rev)
        //     if (rev.user.toString() == req.user._id.toString()) {
        //         isReviewed1 = true;
        //     }
        // })

        // console.log(isReviewed1)
        const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
        console.log('isReviewed', isReviewed)

        if (isReviewed) {
            console.log('If works')
            product.reviews.forEach(rev => {
                if (rev.user.toString() === req.user._id.toString()) {

                    rev.rating = review.rating
                    rev.comment = review.comment
                }
            })
        } else {
            product.reviews.push(review)
            console.log('Else works')
            product.numOfReviews = product.reviews.length
        }
        let avg = 0;
        product.reviews.forEach(rev => {
            avg = avg + rev.rating;
        })

        product.ratings = avg / product.reviews.length

        await product.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            product
        })

    }
)

//Get All Reviews of a single product
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 201))
    }



    res.status(200).json({
        success: true,
        reviews: product.reviews
    })


})

//Delete Review
const deleteReviews = catchAsyncErrors(async (req, res, next) => {
    const productId = req.query.productId;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 201))
    }

    const reviews = product.reviews.filter(function (rev) {
        return rev._id.toString() !== req.query.id.toString()
    })

    let avg = 0;
    reviews.forEach((rev) => {
        avg = avg + rev.rating;
    })

    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    )

    res.status(200).json({
        success: true,

    })


})

module.exports = {
    createProductReview, createProduct,
    getAllProducts, deleteProduct, updateProduct,
    getProductDetails, getProductReviews,
    deleteReviews,getAdminProducts
}