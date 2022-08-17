const express = require('express')
const User = require('../models/users')
const auth = require('../middelware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendMail, sendMailForService, sendMailForEmailVerification} = require('../email/account')



const router = new express.Router()

router.post('/tracker/signup', async(req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
    //    // var code = getTokenNum(token)
    //    sendMailForEmailVerification(req.body.email,req.body.name,  getTokenNum(token))

        res.send({isSuccessful:true, message:'Signup Successful!', user, token})
    }catch(e){
        res.status(400).send({isSuccessful:false, message:e.message, e})
    }
})

router.post('/tracker/login', async(req, res)=>{
    try{
        const user = await User.findByCredential(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        res.send({isSuccessful:true, message:"Login Successful",user, token})
    }catch(e){
        res.status(400).send({isSuccessful:false, message:"User Name or Password Invalid",e})
    }
})

router.get('/tracker/logout', auth, async(req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send({isSuccessful:true, message:"Logout successful!"})
    }catch(e){
        res.status(501).send({isSuccessful:false, message:"Logout Failed!"})
    }
})





router.get('/tracker/login/me', auth, async (req, res) => {
    res.send({isSuccessful:true, message:"Login successful"})
    
})




router.patch('/tracker/login/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'phone']
    const isValideOperation = updates.every((updates)=> allowedUpdates.includes(updates))

    if(!isValideOperation){
        return res.status(404).send({error:'Invalide Updates!'})
    }
    try{
        updates.forEach((updates) => req.user[updates] = req.body[updates])
        await req.user.save()
        res.send([{isSuccessful:true, message:" Updated successful"},req.user])
    }catch(e){
        res.status(400).send({isSuccessful:false, message:"Updat Failed!",e})
    }
    
})
router.get('/tracker/user/:id', async (req, res)=>{
    const _id = req.params.id
    try{
        const user = await User.findOne({_id})
        if(!user){
            return res.status(400).send({isSuccessful:false, message:'Data not found!!'})
        }
        res.send({isSuccessful:true, message:'Data Found!',user})
    }catch(e){
        res.status(500).send({isSuccessful:false, message:'Data Not Found!',e})
    }
})




const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})



router.post('/forgot/password/:email', async(req, res)=>{
    try{
        const user = await User.findOne({email:req.params.email})
        if(!user){
            throw new Error("No User Found")
        }
        var tok = getRandomNum(10000).toString()
        user.otp = tok
        await user.save()
       sendMailForEmailVerification(req.params.email, user.name, tok )
        res.send({isSuccessful:true, message:'Email Sent!', email: user.email})
    }catch(e){
    res.status(400).send({isSuccessful:false, message:"Delivery Failed!",e})
}
})

router.get('/forgot/password/verify/otp/:otp/:email', async(req, res)=>{
    try{
        const user = await User.findOne({email:req.params.email, otp: req.params.otp})
        if(!user){
            throw new Error("No User Found")
        }
        res.send({isSuccessful:true, message:'Verified Successfully!',  email: user.email})
    }catch(e){
    res.status(400).send({isSuccessful:false, message:"Wrong OTP Please check and try Again!",e})
}
})

router.patch('/edit/password/:email', async (req, res) => {

    const user = await User.findOne({email:req.params.email})
    const updates = Object.keys(req.body)
    const allowedUpdates = ['password', 'phone']
    const isValideOperation = updates.every((updates)=> allowedUpdates.includes(updates))

    if(!isValideOperation){
        return res.status(404).send({error:'Invalide Updates!'})
    }
    try{
        updates.forEach((updates) => user[updates] = req.body[updates])
        await user.save()
        res.send([{isSuccessful:true, message:" Updated successful"},user])
    }catch(e){
        res.status(400).send({isSuccessful:false, message:"Updat Failed!",e})
    }
    
})
function getTokenNum(tok){
    var generatedCode = ""

    for(var i=0; i<=tok.length-1;i++){
        if(i >= tok.length-4){
        generatedCode += tok[i] 
        }
    }
    return generatedCode
}

function getRandomNum(max){
    return Math.floor(Math.random()* Math.floor(max))
}

module.exports = router