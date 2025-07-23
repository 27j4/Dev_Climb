const mongoose = require('mongoose')
const validator = require("validator")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required: true,
        // unique: boolean, whether to define a unique index on this property.
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid email:"+value);
            }
        }
    },
    password:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a Strong Password")
            }
        }
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        // this is applicable only when  first times/new document is created
        // validate(value) {
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender data is not valid")
        //     }
        // }
                        // or
        enum:{
            values: ["male","female","other"],
            message:'{VALUE} is not a valid gender type'
        }
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Not a valid URL:"+value);
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about of an user!"
    },
    skills:{
        type:[String],
    }
},{timestamps:true})



userSchema.methods.getJWT = async function(){
    const user=this;
    const token = await jwt.sign({_id:user._id},process.env.access_token,{
        expiresIn:"7d",
    });
    return token;
}

userSchema.methods.validatePassword = async function(passwordinput){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordinput,user.password);
    return isPasswordValid;
}

const User = mongoose.model("User",userSchema);
module.exports = User;