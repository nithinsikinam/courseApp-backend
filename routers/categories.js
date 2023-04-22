const express = require('express');
const router = express.Router();
const tags = require("../schemas/tags")
const intrests = require("../schemas/interests")

router.post("/getintrests",async (req,res)=>{
    const intrest = await intrests.find();
    res.status(200).json({"intrests":intrest[0].intrest})
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
    await tag.save();
    res.status(200).json({"status":"TAG_CREATED"})
})

module.exports = router