import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  attachments: [
    {
      type: String, // URL to media files
      default: [],
    },
  ],
  readBy: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      readAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  chatType: {
    type: String,
    enum: ["personal", "group"],
    required: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  groupName: {
    type: String,
    // Required only for group chats
  },
  groupAvatar: {
    type: String,
    // Optional for group chats
  },
  admin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // Only for group chats
    },
  ],
  messages: [messageSchema],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a separate Message model for easier querying
const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

// Adding indexes for better query performance
chatSchema.index({ participants: 1 });
chatSchema.index({ updatedAt: -1 });

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export { Chat, Message };
