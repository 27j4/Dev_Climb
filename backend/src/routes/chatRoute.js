const express = require('express');
const { userAuth } = require('../middlewares/auth');
const Chat = require('../models/chat');
const chatRoute = express.Router();
const mongoose = require("mongoose"); // Add this at the top
const ObjectId = mongoose.Types.ObjectId;

chatRoute.get('/chat/:targetUserId',userAuth,async(req,res)=>{
    const {targetUserId} = req.params
    const userId = req.user._id;
    try {
        let chat = await Chat.findOne({
            participationId:{
                $all:[userId,targetUserId]
            }
        }
    ).populate({
        path:"messages.senderId",
        select:"firstName lastName"
    })
    
    if(!chat){
        chat = new Chat({
            participationId:[userId,targetUserId],
            messages:[]
        })
        await chat.save();
    }
    res.send(chat);
    } catch (error) {
        res.send("something went wront in chatRouter")
    }
})

module.exports = chatRoute