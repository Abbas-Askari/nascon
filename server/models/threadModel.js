const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ThreadMessage",
    },
  ],
});

const Thread = mongoose.model("Thread", threadSchema);

// Thread.create({
//   title: "My First Thread",
//   content: [
//     { id: 1709359877192, type: "text", attachment: "asdlkasjdlaksjd" },
//     { id: 1709359962367, type: "text", attachment: "asdasd" },
//     { id: 1709360079382, type: "text", attachment: "" },
//   ],
// }).then((Thread) => {
//   console.log(Thread);
// });

module.exports = Thread;
