const express = require('express');
const db = require('./db');
const userProfile = require('./routers/userProfile')
const app = express();

app.use(express.json())
app.use("/userProfile",userProfile)

app.listen(3000,() =>{console.log("Server Started")})