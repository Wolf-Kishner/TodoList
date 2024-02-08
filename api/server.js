const express = require("express"); // Handling our api
const mongoose = require("mongoose"); // Handling the Databases

const User = require("./models/user.model");
const cors = require("cors");  

const jwt = require("jsonwebtoken");
// Hwt allows us to create a token which only we can create
//and can allow us to dtermine if the user is legit
const app = express(); //Creating an Express APplication

//MiddleWares : Tells Express that we  are passing info in JSON FORMATs
app.use(express.json()); //It allows to use Content type of application

//MiddleWares Mainpulates the Response
app.use(cors()); //Stop any Cross Origin Errors Required in DEvelpmemnt

//Mongoose.connect returns a promise but Mongoose internally queues it puts in a queue if connection is not ready Yet

// q2NQ4aVoBJQnnBKU

mongoose
  .connect("mongodb+srv://vedant8kulkarni:q2NQ4aVoBJQnnBKU@cluster0.movv1ue.mongodb.net/?retryWrites=true&w=majority", {})
  .then(() => console.log("Connected to DB"))
  .catch(console.error); //If any errors it gets console logged
//We can now Import the Models created inside our server
const Todo = require("./models/Todo");

//We want to list out our Todos
//If we make a request to localhost3001/todos its gong to find our Todos and here we are going to find it using our mpodels connected to mongoose DB its going to find all todos and pass it back here

app.post("/api/register", async (req, res) => {
  console.log(req.body); //Parse anything that comes as body in JSON

  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate Email" });
  }
});

//Login Route
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  //If At all USER returns True ie ALready Registered means staus ok or else error

  //Along with status ok we recieve a TOKEN just a random string encoded with certain secuirty and has 2 fullstoops and  payload between 2 fullstops
  if (user) {
    //Palyod that we wanna sign
    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
      },
      "secret123"
    );

    return res.json({status :'ok',user:token})
  } else {
    return res.json({ status: "error", user: false });
  }
});

//We are getting the data from "/todos" page using the Todo model 
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

//We are Setting up routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

//In here we are creating new Todos
//Sending data using the HTT protocol to the Database to store the item of Todo model 
app.post("/todo/new", (req, res) => {
  //This allows for New Entry of Todo in MongoDb Databse and inside of which we need to pass through text as it it is the only required field
  const todo = new Todo({
    text: req.body.text,
  });
  //Saves the list to collection
  todo.save();
  res.json(todo);
});

//Deleting an Item : It shoulda have some ID w e cant just Randomly delte an data entry
// :NAME ---> URL param its going to be dyamic piece of data
app.delete("/todo/delete/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id); //Trying to find whether the Element with that id  is Present or Not 

    if (!todo) {
      console.error("Todo not found:", req.params.id);
      return res.status(404).json({ error: "Todo not found" });
    }

    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result); //Sending the JSON response back to  Client 
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Toggle Completing
app.get("/todo/complete/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      console.error("Todo not found:", req.params.id);
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.complete = !todo.complete;
    todo.save();

    res.json(todo);
  } catch (error) {
    console.error("Error toggling completion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//Our Server is Started on Port 3001
app.listen(3001, () => console.log("Server Started on Port 3001"));
