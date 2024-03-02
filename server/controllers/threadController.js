const Post = require("../models/postModel");
const ThreadMessage = require("../models/threadMessageModel");
const Thread = require("../models/threadModel");

async function getAllThreads(req, res) {
  const threads = await Thread.find({}).exec();
  console.log(threads);
  res.json({ threads });
}

async function getThread(req, res) {
  const { threadId } = req.params;
  const thread = await Thread.findById(threadId).populate("messages").exec();
  res.json({ thread });
}

async function createThread(req, res) {
  const { title, content } = req.body;
  console.log(req.user, req.body);
  const thread = new Thread({
    title,
    content,
    user: req.user._id,
    messages: [],
  });
  await thread.save();
  res.json({ message: "asdada", thread });
}

async function addMessageToThread(req, res) {
  const { content } = req.body;
  const { threadId } = req.params;
  const user = req.user._id;
  const thread = await Thread.findById(threadId).exec();
  const message = new ThreadMessage({ content, user });
  await message.save();
  thread.messages.push(message);
  await thread.save();
  console.log(thread);
  res.json({ message });
}

module.exports = { getAllThreads, getThread, createThread, addMessageToThread };
