const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    phonenumber:{
      type:Number,
      unique:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", UserSchema);

