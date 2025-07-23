const express = require('express');
const authRouter = express.Router();
const {validationSignUpData} = require('../utils/validation')
const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcrypt')

authRouter.post("/signup",async (req,res)=>{
    try{
        // Validation of data
        validationSignUpData(req);
        const {firstName, lastName, emailId, password,skills,photoUrl} = req.body
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password,10);
        // creating a new instances of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
            photoUrl,
            skills,
        });
        const data = await user.save();
        const token =  await data.getJWT();
        // add the token to cookie and send the response back to the user
        res.cookie("token",token,{
            expires:new Date(Date.now() + 8*360000),
        })
        res.json({message:"Data stored successfully",data});
    }catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
})

authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId, password} = req.body;
        console.log(req.body)

        if(!validator.isEmail(emailId)){
            throw new Error("Email is not valid")
        }
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("EmailId is not present in DB!!");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(!isPasswordValid){
            throw new Error("Password is not correct!!")
        }else{
            // create a Json Token
            const token =  await user.getJWT();
            // add the token to cookie and send the response back to the user
            res.cookie("token",token,{
                expires:new Date(Date.now() + 8*3600000),
            })
            res.status(200).send(user)
        }
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
})

// POST requests require explicit action, making them safer for modifying state.
authRouter.post("/logout",async (req,res)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
    })
    res.send("Logout Successful!")
})
 
module.exports = authRouter