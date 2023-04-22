const mongoose = require('mongoose');

    try{
        const conn =  mongoose.connect("mongodb://localhost:27017/test")

       console.log("connecction eastablished")
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }

