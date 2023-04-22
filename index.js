const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json())
app.use("/userProfile")

app.listen(3000,() =>{console.log("Server Started")})