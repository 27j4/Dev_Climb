const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // refrence to the user collection
        require:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    status:{
        type:String,
        require:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:'{VALUE} is incorrect status type'
        }
    }
},
{
    timestamps:true,
}
)

connectionRequestSchema.index({fromUserId:1 ,toUserId:1})

connectionRequestSchema.pre('save',function(next){
    const connectionRequest = this;
    // check if the fromuserId is same as touserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send request to yourself!")
    }
    next()
})

const connectionRequestModel = mongoose.model("connectionRequest",connectionRequestSchema);
module.exports=connectionRequestModel