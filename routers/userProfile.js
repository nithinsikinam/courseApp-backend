const express = require('express');
const router = express.Router();
const users = require('../schemas/users');
const UserOTPVerification = require('../schemas/UserOTPVerification')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"nithinsikinam@gmail.com",
        pass:"bamifbupearynnaf"
    }
})

router.post('/login', async (req,res) => {
 
    const search = await users.find({"userid":req.body.userid,"verified":true})
    if(search.length==1){      
    if(await bcrypt.compare(req.body.password,search[0]["password"])){
    const id = req.body.userid;
    const user = {"id":id} ;
    const accessToken = jwt.sign(user,"f2277753af26589279dbbd49634346b89216521342715df6d596ec8b01c6ca5625cc270a5411e6629ef584d2d6f4b0258401a64631c0f6a3ca1e25feb3e64c80")   
    res.json({"status":"YES","access_token":accessToken})
    }else{
    res.json({"status":"INCORRECT_PASSWORD"})
   }}
    else{
    res.json({"status":"NO_SUCH_USER"})
    }
})

router.post('/register', async (req,res) => { 

    const userid = req.body.emailid.split("@")[0]
    
    const search = await users.find({"userid":userid})
    if(search.length!==0){
        res.status(400).json({"status":"CHOOSE_ANOTHER_EMAIL"})
    }
else{
    const hashedPassword = await bcrypt.hash(req.body.password,10)

    const user = await users.create({
        userid:userid,
        emailid:req.body.emailid,
        password:hashedPassword,
        intrests:req.body.intrests,
        verified:false
    }
        )
await user.save()
   
    const otpnumber = `${Math.floor(1000+Math.random()*9000)}`;
    
    const mailOptions = {
        from:"nithinsikinam@gmail.com",
        to:req.body.emailid,
        subject:"verify your email",
        html:`<p>Enter <b>${otpnumber}</b></p>`
    }

    const otp = await UserOTPVerification.create({
        userid:userid,
        otp:otpnumber,
        createdat:Date.now(),
        expiresat:Date.now()+3600000,
    })
    await otp.save()
    await transporter.sendMail(mailOptions)

    

res.json({"status":"CREATED_TEMPORARY_ACCOUNT"})
    }
    })

    
router.post("/verifyotp",async (req,res)=>{
    const userid = req.body.emailid.split("@")[0]
    const search = await UserOTPVerification.find({
        "userid":userid,
    })
    if(search.length==0){
        res.status(400).json({"status":"ALREADY_VERIFIED"})
    }else{
        const expiresat = search[0].expiresat;
        const otp = search[0].otp
        if(expiresat<Date.now()){
            await UserOTPVerification.deleteMany({"userid":userid})
            res.status(400).json({"status":"CODE_EXPIRED"})
        }else{
            if(otp===req.body.otp){
                await users.findOneAndUpdate({"userid":userid},{"verified":true})
                res.status(200).json({"status":"OK"})
            }else{
                res.status(400).json({"status":"OTP_INCORRECT"})
            }
        }
    }
})



module.exports=router