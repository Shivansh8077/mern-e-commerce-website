const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');
// const { use } = require('../routes/userRoute');
const cloudinary = require('cloudinary')


//Register a User
const registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });


    const userObj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
            // public_id: 'myCloud.public_id',
            // url: 'myCloud.secure_url',
        }
    }

    // console.log('userObj', userObj);
    const user = await User.create(userObj)
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }
    sendToken(user, 201, res);
});


//Login User
const loginUser = catchAsyncErrors(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // checking if user has given user and password
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Password and Email Address", 400))

    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    sendToken(user, 200, res);
})

//Logout User

const logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged out Successfully"
    })
})


//Forgot Password

const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User Not found", 404))
    }

    // Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // req.protocol = http OR https is depends
    // req.get('host') = localhost  OR goDaddy OR it depends whatever your host is when the server is not local
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n.If you have not requested this email then please ignore it `

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Your Password Recovery`,
            message

        })
        res.status(200).json({
            success: true,
            message: `Email send to user ${req.body.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

//Reset Password

const resetPassword = catchAsyncErrors(async (req, res, next) => {

    // getting token from the URL (http://localhost:4000/api/v1/password/reset/b31646248d5ad1d3a0dcc12866a0beb10ac5c821)
    const token = req.params.token

    //getting the user of this token
    //this token was hashed and stored in the db so we need to hash it again before comparing

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() } //make sure that the token is not expired
    })

    console.log('user,', resetPasswordToken)

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is Invalid or has been expired", 404))

    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 404))

    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})

// Get User Detail

const getUserDetail = catchAsyncErrors(async function (req, res, next) {

    const user = await User.findOne({ "email": req.user.email })
    if (!user) {
        return next(new ErrorHandler("User not Found", 404))
    }
    // console.log('email', req.user.id)
    res.status(200).json({
        success: true,
        user
    })


})
// Update User Password

const updatePassword = catchAsyncErrors(async function (req, res, next) {

    const user = await User.findOne({ id: req.user.id }).select('+password')
    if (!user) {
        return next(new ErrorHandler("User not Found", 404))
    }

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Old Password", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler(" Old Password and Confirmed Password does not match", 400))
    }

    user.password = req.body.newPassword;
    await user.save({ validateBeforeSave: false });

    sendToken(user, 200, res);



})
// Update User Profile

const updateProfile = catchAsyncErrors(async function (req, res, next) {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // We will add avatar later
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
         // console.log('In update profile',user)

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    // console.log('UserData 233',newUserData)
    const user = await User.findByIdAndUpdate({ _id: req.user.id },
        newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(200).json({
        success: true,
        user
    })
})

// GEt all USers
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();


    res.status(200).json({
        success: true,
        users
    })
})


// Get single user details --- (Admin)
const getSingleUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User does not exists", 404))
    }


    res.status(200).json({
        success: true,
        user
    })
})

// Update user Role --- (Admin)
const updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    // We will add avatar later

    const user = await User.findByIdAndUpdate(req.params.id,
        newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (!user) {
        return next(new ErrorHandler("User does not exists", 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Delete user  --- (Admin)
const deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    console.log(user)
    if (!user) {
        return next(new ErrorHandler("User does not exists", 404))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: `User with id:${req.params.id} deleted successfully`
    })
})

module.exports = {
    registerUser, loginUser,
    logout, forgotPassword,
    resetPassword, getUserDetail,
    updatePassword, updateProfile,
    getAllUsers, getSingleUserDetails,
    updateUserRole, deleteUser
};