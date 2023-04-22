const express = require('express');
const db = require('./db');
const app = express();

app.get("/", function(req, res){
    res.send("hello")
})

app.listen(3000,() =>{console.log("Server Started")})