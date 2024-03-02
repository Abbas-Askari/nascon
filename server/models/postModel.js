const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: [
    {
      type: { type: String },
      attachment: String,
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

// Post.create({
//   title: "My First Post",
//   content: [
//     { id: 1709359877192, type: "text", attachment: "asdlkasjdlaksjd" },
//     { id: 1709359962367, type: "text", attachment: "asdasd" },
//     { id: 1709360079382, type: "text", attachment: "" },
//   ],
// }).then((post) => {
//   console.log(post);
// });

module.exports = Post;
