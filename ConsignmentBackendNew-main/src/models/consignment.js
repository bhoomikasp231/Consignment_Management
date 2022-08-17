const mongoose = require('mongoose')

const consignmentSchema = new mongoose.Schema({
    rfidData:{
        required:true,
        unique: true,
        type:String
    },
    consignmentName:{
        required:true,
        unique: true,
        type:String
    },
    trackStatus:{
        type:String
    },
    sourcePerson:{
        personName:{
            required:true,
            type:String
        },
        emailID:{
            required:true,
            type:String
        },
        phnNo:{
            required:true,
            type:Number
        },
        state:{
            required:true,
            type:String
        },
        city:{
            required:true,
            type:String
        },
        pincode:{
            required:true,
            type:Number
        }
    },
    destinationPerson:{
        personName:{
            required:true,
            type:String
        },
        emailID:{
            required:true,
            type:String
        },
        phnNo:{
            required:true,
            type:String
        },
        state:{
            required:true,
            type:String
        },
        city:{
            required:true,
            type:String
        },
        pincode:{
            required:true,
            type:Number
        }
    },
    consignmentDetails:{
        consignmentID:{
            required:true,
            type:String
        },
        companyName:{
            required:true,
            type:String
        },
        companyType:{
            required:true,
            type:String
        },
        source:{
            required:true,
            type:String
        },
        destination:{
            required:true,
            type:String
        },
        weights:{
            required:true,
            type:String
        },
        intermediateLocation:{
            required:true,
            type:String
        },
        sentTime:{
            required:true,
            type:String
        },
        expectedDelivery:{
            required:true,
            type:String
        }
    },
    vehicleDetails:{
        vehicleName:{
            required:true,
            type:String
        },
        vehicleNum:{
            required:true,
            type:String
        },
        vehicleNumPlate:{
            required:true,
            type:String
        },
        conditions:{
            required:true,
            type:String
        }
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
        },
   
    
},{
    timestamps: true
})


const Consignment = mongoose.model('Consignment', consignmentSchema)

module.exports = Consignment