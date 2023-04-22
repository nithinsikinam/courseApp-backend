const express = require('express');
const router = express.Router();

router.post('/login', async (req,res) => {
    console.log(req.body._id);
     console.log(req.body.Password);
    const search = await users.find({"_id":req.body._id})
    if(search.length==1){      
    if(await bcrypt.compare(req.body.Password,search[0]["Password"])){
    const id = req.body._id;
    const user = {"id":id} ;
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)   
    res.json({"value":"yes","access_token":accessToken})
    }else{
    res.json({"value":"no"})
   }}
    else{
    res.json({"value":"no"})
    }
})

router.post('/register', async (req,res) => { 
    const search = await users.find({"_id":req.body._id})
    if(search.length!==0){
        
        res.json({"value":"no"})
    }
else{
    const hashedPassword = await bcrypt.hash(req.body.Password,10)
    const user = await users.create({
        Password:hashedPassword,
        EmailId:req.body.EmailId,
        Interests:req.body.Interests,
})
await user.save()
res.json({"value":"yes"})
    }
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