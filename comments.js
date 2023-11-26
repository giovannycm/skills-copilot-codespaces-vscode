//Create web server
//import express
const express = require("express");
//import bodyParser
const bodyParser = require("body-parser");
//import mongoose
const mongoose = require("mongoose");

//import Comment model
const Comment = require("./models/Comment");

//create express app
const app = express();

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/comments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//body parser middleware
app.use(bodyParser.json());

//create a comment
app.post("/comments", (req, res) => {
  //create a new comment
  const newComment = new Comment({
    username: req.body.username,
    comment: req.body.comment,
  });

  //save comment
  newComment.save().then((comment) => {
    res.json({
      message: "Comment added successfully",
    });
  });
});

//get all comments
app.get("/comments", (req, res) => {
  Comment.find().then((comments) => res.json(comments));
});

//get a single comment
app.get("/comments/:id", (req, res) => {
  Comment.findById(req.params.id).then((comment) => res.json(comment));
});

//update a comment
app.put("/comments/:id", (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        comment: req.body.comment,
      },
    },
    { new: true }
  ).then((comment) => res.json(comment));
});

//delete a comment
app.delete("/comments/:id", (req, res) => {
  Comment.findByIdAndRemove(req.params.id).then((comment) =>
    res.json({
      message: "Comment deleted successfully",
    })
  );
});

//start server
app.listen(3000, () => {
  console.log("Server started on port 3000...");
});