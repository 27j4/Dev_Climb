const socket = require('socket.io')
const crypto = require('crypto');
const Chat = require('../models/chat')
const getSecretRoomId = (userId,targetUserId)=>{
    const a = userId.toString();
    const b = targetUserId.toString();
    return crypto
    .createHash("sha256")
    .update([a,b].sort().join('$%^'))
    .digest("hex");
}
// This function initializes WebSocket communication on top of this HTTP server.
const initializeSocket = (server)=>{
    const io = socket(server,{
        cors:{
            origin:["http://localhost:5173","https://devclimb-1.onrender.com"],
        },
    });
    // 4. connection on
    // socket below in parameter=>It automatically represents the newly connected client.
    io.on("connection",(socket)=>{
        // 4.a handle events
        socket.on("joinChat",({userName,userId,targetUserId})=>{
            const roomId = getSecretRoomId(userId,targetUserId);
            // console.log(userName,":",roomId);
            socket.join(roomId)
        });
        
        socket.on("sendMessage",async ({firstName,lastName,userId,targetUserId,text})=>{
            const roomId = getSecretRoomId(userId,targetUserId);
            // console.log(firstName+" "+text);
            let chat = await Chat.findOne({
                participationId:{$all:[userId,targetUserId]},
            })
            if(!chat){
                chat = new Chat({
                    participationId:[userId,targetUserId],
                    messages:[]
                })
                // console.log("Successfull")
            }
            chat.messages.push({senderId:userId,text});
            await chat.save();
            io.to(roomId).emit("messageReceived",{firstName,lastName,text})
        });

        socket.on("disconnect",()=>{})
    })
}

module.exports = initializeSocket;
