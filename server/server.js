const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

const app = express();  

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/auth", authRouter);
app.use("/users", userRouter);


app.listen(4000);
console.log("listening!");
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => console.log(err));