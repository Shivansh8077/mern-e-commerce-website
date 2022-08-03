const mongoose = require('mongoose');



const connectDatabase = ()=>{

    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((data)=>{
    console.log(`MongoDB connected with server ${data.connection.host}`)
    })
    .catch((err)=>{
        console.log(err)
    })
}

//Whenever imported this file will establish a connection to the database

module.exports = connectDatabase;