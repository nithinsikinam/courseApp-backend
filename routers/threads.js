const express = require('express');
const router = express.Router();
const threads = require('../schemas/thread');
const privateFeed = require('../schemas/privateFeed')
const multer = require("multer");
const nodemailer = require('nodemailer');
const users = require('../schemas/users');
const jwt = require("jsonwebtoken")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = `uploads/${req.threadid}`;
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  const upload = multer({ storage: storage });

  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"nithinsikinam@gmail.com",
        pass:"bamifbupearynnaf"
    }
})


router.post('/privatefeed',authenticateToken, async(req,res)=>{
    const thread = await privateFeed.create({ 
        userid:req.user.id,
        touserid:req.body.id,
        date:Date(),
        questionHead:req.body.questionhead,
        questionBody:req.body.questionbody,
    })
    res.status(200).json({"status":"SUCCESS"})
})


router.post('/createthread',authenticateToken,async (req, res) => {
    const thread = await threads.create({
        userid:req.user.id,
        date:Date(),
        intrests:req.body.intrests,
        tags:req.body.tags,
        questionHead:req.body.questionhead,
        questionBody:req.body.questionbody,
    })
    res.status(200).json({"status":"SUCCESS"})
  });

router.post("/defaultfeed",async(req,res)=>{
 const feed = await threads.find();
 res.status(200).json({"status":"SUCCESS","feed":feed})
})

router.post("/feed",authenticateToken,async (req,res)=>{
    console.log(req.user.id)
 const user = await users.findOne({"userid":req.user.id})
 
 const feed = await threads.find({intrests:{$in:user.intrests}})

 res.status(200).json({"status":"SUCCESS","feed":feed})
})

router.post("/replythread",authenticateToken,async (req,res)=>{
    const reply = req.body.reply
    const id = req.body.id;
    const userid = req.user.id
    const thread = await threads.findByIdAndUpdate(
        Object(id),
        { $push: { replies: { userid, reply } } },
        { new: true }
      );
        const user = await users.findOne({userid: thread.userid})
      const mailOptions = {
        from:"nithinsikinam@gmail.com",
        to:user.emailid,
        subject:"verify your email",
        html:`<p><h1>Hi!! Your question has been answer by</h1><h2>${userid}</h2></p>`
    }
    await transporter.sendMail(mailOptions)
      res.status(200).json({"status":"SUCCESS"})
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    
    jwt.verify(token,"f2277753af26589279dbbd49634346b89216521342715df6d596ec8b01c6ca5625cc270a5411e6629ef584d2d6f4b0258401a64631c0f6a3ca1e25feb3e64c80",(err,user) =>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}  
module.exports=router