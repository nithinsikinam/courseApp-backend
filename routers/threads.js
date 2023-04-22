const express = require('express');
const router = express.Router();
const thread = require('../schemas/thread');

const multer = require("multer");
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

router.post("/addanswer",(req,res)=>{

})

router.post("/addreply",(req,res)=>{
    
})



router.post("/createthread",multer({
    storage: fileStorage,
}).single('selectedProductImage'),async(req,res)=>{
    const retrievedImage = req.file.originalname;
    const questionHead = req.body.questionHead;
    const questionBody = req.body.questionBody;
    const tags  = req.body.tags;
    function extractIDFromImage(image) {
        return image.split('.')[0]
    }
const idToBeUsed = extractIDFromImage(retrievedImage);

    try{const threadNew = await thread.create({
       
    });
    res.status(200).json({"status":"THREAD_CREATED"})
}
   catch(err){console.log(err)}

})

router.post("/defaultfeed",(req,res)=>{

})

router.post("/feed",authenticateToken,(req,res)=>{
 
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}  
module.exports=router