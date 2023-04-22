const express = require('express');
const db = require('./db');
const userProfile = require('./routers/userProfile')
const thread = require('./routers/threads');
const categories = require('./routers/categories')
const path = require('path');
const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/userProfile",userProfile);
app.use("/thread",thread)
app.use("/categories",categories);

app.listen(5000,() =>{console.log("Server Started")})