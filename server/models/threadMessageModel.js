const mongoose = require("mongoose");

const threadMessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ThreadMessage",
  },
});

const ThreadMessage = mongoose.model("ThreadMessage", threadMessageSchema);

module.exports = ThreadMessage;
