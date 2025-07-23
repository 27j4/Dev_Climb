const express = require('express');
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const requestRouter = express.Router();
const User = require('../models/user')

requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId
        const status = req.params.status
        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status types:" + status})
        }
        const toUser = await User.findById(toUserId);
        if(!toUser) return res.status(404).json({message:"User Not Found"})
        // If there is an existing connectionRequest
        const existingConnectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
        if(existingConnectionRequest && existingConnectionRequest.length>0){
            return res.status(400).send({message:"Connection request already exists!!"});
        }
        const connectionRequest =  new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();
        res.json({
            message:req.user.firstName + " is "+status+" in "+toUser.firstName, 
            data
        })
    } catch (error) {
        res.status(400).send("ERROR:"+error.message)
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const {status,requestId} = req.params;
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            res.status(400).json({message:"status is not allowed!"});
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        })
        if(!connectionRequest){
            return res.status(404).json({message:"Connection Request Not found"});
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.status(200).json({message:"Connection request "+status,data})
    } catch (error) {
        res.status(400).send("Error:"+error.message);
    }
})



module.exports = requestRouter