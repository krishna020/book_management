// express is an server-side web framework for node.js which execute our code on the web
const express = require("express");
//body parser is a middleware, used to process data sent through an HTTP request body.
const bodyParser = require("body-parser");
const route = require("./routes/routes.js"); //imported route
const mongoose = require("mongoose"); //ODM library for mongoDB
const app = express(); //Assign express in app variable

const multer= require("multer");//multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const { AppConfig } = require('aws-sdk');//


app.use(bodyParser.json()); //transforms the text-based JSON input into JS-accessible variables
//extended: true precises that the req.body object will contain values of any type instead of just strings.
app.use(bodyParser.urlencoded({ extended: true }));
app.use( multer().any())

//a framework that helps to establish a connection b/w node and mongoDB
mongoose
  .connect(
    "  ",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("mongoDB Connected")) //return fullfiled promise
  .catch((err) => console.log(err)); //return rejected promise

app.use("/", route);

//port is two-way communication link between two programs running on the network
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
