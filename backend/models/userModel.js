const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [4, "Name should be atlease 4 characters"],
        maxLength: [30, "Name should be atMax 30 characters"],
        required: [true, "Please Enter Name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minLength: [8, "Password should be atlease 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user" //admin / user
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

// Event fired before submitting to database field
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

//JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// Compare Password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generating  Password and Reset Token
userSchema.methods.getResetPasswordToken = function () {

    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetPassword Token to userSchema(database)
    //Returns a hashed string(of the token  )
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

        
    this.recentPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;

}





module.exports = mongoose.model("User", userSchema);

