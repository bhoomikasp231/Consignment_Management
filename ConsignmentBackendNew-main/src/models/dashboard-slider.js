const mongoose = require('mongoose')

const dashboardSliderSchema = new mongoose.Schema({
  
    discription:{
        type:String
    },
    images:{
        type:Buffer, 
        unique:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
},{
        timestamps:true
    }
)

dashboardSliderSchema.methods.toJSON = function(){
    const imgSlider = this
    const imgSliderObject = imgSlider.toObject()
    delete imgSliderObject.images
    return imgSliderObject
}

const DashboardSlider = mongoose.model('DashboardSlider', dashboardSliderSchema)

module.exports = DashboardSlider