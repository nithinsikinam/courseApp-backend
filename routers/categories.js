const express = require('express');
const router = express.Router();
const tags = require("../schemas/tags")
const intrests = require("../schemas/interests")

router.get("/getintrests",async (req,res)=>{
    const intrest = await intrests.find();
    res.status(200).json({"status":"SUCCESS","intrests":intrest})
})

router.post("/gettags",async (req,res)=>{
    const tag = await tags.find({ tag: { $regex:req.body.tag , $options: "i" } })
    res.status(200).json({"tags":tag})
})

router.post("/addintrest",async(req,res)=>{
    try{const intrest = await intrests.create({
        intrest:req.body.intrest
    });
    res.status(200).json({"status":"INTREST_CREATED"})
}
   catch(err){console.log(err)}
    
})

router.post("/addtag",async(req,res)=>{
    const tag = await tags.create({
        tag:req.body.tag
    });
    
    res.status(200).json({"status":"TAG_CREATED"})
})

module.exports = router