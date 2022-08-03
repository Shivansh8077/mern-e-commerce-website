// This file is to activate conn at localhost

// importing express from app.js
const app = require('./app')

//to activate config.env 
const dotenv = require('dotenv');

//cloudinary
const cloudinary = require('cloudinary')
cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_NAME      ,
    // api_key: process.env.CLOUDINARY_API_KEY        ,
    // api_secret: process.env.CLOUDINARY_API_SECRET
    cloud_name: "shivansh"    ,
    api_key: "337334316714577"        ,
    api_secret: "o_6amBclHON4Qhhq7Ex1YAmmpm4"
})

//config
dotenv.config({ path: 'backend/config/config.env' })

//Connecting to database
const connectDatabase = require('./config/database');
connectDatabase();

// Ushandled Promise ejection
process.on("uncaughtException", (err) => {
    console.log(` Error : ${err.message}  `)
    console.log(" shutting down the server due to Unhandled Promise Rejection ")
    process.exit(1)
})

app.listen(process.env.PORT, () => {

    console.log(`Server is working on http://localhost:${process.env.PORT}`);

})

// Ushandled Promise ejection
process.on(" UnhandeledRejection ", (err) => {
    console.log(` Error : ${err.message}  `)
    console.log(" shutting down the server due to Unhandled Promise Rejection ")
    server.close(() => {
        process.exit(1)
    });
})