const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  //3 Fields 3  objects
  text: {
    type: String,
    required: true,
  },
  complete: {
    //When we create a First To do or Store a Todo in a Schema it sets its Complete value to false unless stated
    type: Boolean,
    default: false,
  },
  timestamp: {
    //Evertime We Create a new To do its going to store the time
    type: String,
    default: Date.now(),
  },
});

//Creates a Mongoose model named 'Todo' based on the 'TodoSchema'. A model is a constructor function that creates documents adhering to the schema.
const Todo = mongoose.model("Todo", TodoSchema);

//With this setup, you can now use the Todo model to perform CRUD operations (create, read, update, delete) on Todo items in your MongoDB database using Mongoose.
module.exports = Todo;
