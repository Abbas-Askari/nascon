const Post = require("../models/postModel");
const User = require("../models/userModel");

async function getAllPosts(req, res) {
  const posts = await Post.find().exec();
  res.json({ posts });
}

async function getPost(req, res) {
  const { postId } = req.params;
  const post = await Post.findById(postId).exec();
  res.json({ post });
}

async function createPost(req, res) {
  const { title, contents } = req.body;
  const content = contents.map((c) => ({ ...c, id: undefined }));
  console.log(req.body);
  const post = new Post({ title, content });
  await post.save();
  res.json({ post });
}

module.exports = { getAllPosts, createPost, getPost };
