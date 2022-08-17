const express = require('express')
const DashboardSlider = require('../models/dashboard-slider')
const auth = require('../middelware/auth')
const multer = require('multer')
const sharp = require('sharp')

const router = new express.Router()


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

router.post('/tracker/dashboard/sliderimage', upload.single('images', (error)=>{
    if(error){
        res.status(400).send({isSuccessful:false, message:'Uploaded Failed!',error})
    }
}), auth, async(req, res)=>{
    const dashboardSlider = new DashboardSlider({
        ...req.body,
        owner: req.user._id, 
        images:req.file.buffer
    })
    try{
        await dashboardSlider.save()
        res.status(200).send({isSuccessful:true, message:'Uploaded Successfully!',dashboardSlider})
    }catch(e){
        res.status(400).send({isSuccessful:false, message:'Uploaded Failed!',e})
    }
})

router.get('/tracker/dashboard/sliderimage', async(req, res)=>{
    try{
        const dashboardSlider = await DashboardSlider.find({}).sort({createdAt:1})
        res.send({isSuccessful:true, message:'Data List!',dashboardSlider})
    }catch(e){
        res.status(500).send({isSuccessful:false, message:'Error!',e})

    }
})

router.get('/tracker/dashboard/sliderimage/:id', async(req, res)=>{
    try{
        const dashboardSlider = await DashboardSlider.findOne({_id:req.params.id})
        if(!dashboardSlider || !!dashboardSlider.DashboardSlider){
            throw new Error('No Image')
        }
        res.contentType('image/png')
        res.send(dashboardSlider.images)
    }catch(e){
        res.status(400).send({isSuccessful:false, message:'Error!',e})
    }
})





module.exports = router