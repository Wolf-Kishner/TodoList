const mongoose = require("mongoose");

//This Mongoose Schema Consisting of these items is a collection called user-data ( Apan dila NAv)
const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        quote: { type: String },
    },
    { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

//Model allows us to directly interact with mongoose
module.exports = model;
