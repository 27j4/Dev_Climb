const mongoose = require("mongoose");
const User = require("./user");
const messageShcema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const chatSchema = new mongoose.Schema({
  participationId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [messageShcema],
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
