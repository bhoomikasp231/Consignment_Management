const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,

        validate(value){
            if(value.includes('password')){
                throw new Error('word password can not be accept inside password')
            }
        }
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase:true, 
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalide Email address')
            }
        }
    },
    otp:{
        type:String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    },active:{
        type:Boolean,
        default:false
    },
},{
    timestamps: true
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.statics.findByCredential = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw Error('Unable to Login!')
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    if(!isMatch){
        throw Error('Unable to Login!')
    }
    return user

}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User