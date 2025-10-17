const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    // lowercase: true,
    // validate: {
    //   validator: (val) => validator.isEmail(val),
    //   message: "Please enter a valid email address"
    // }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  }
});

module.exports = mongoose.model("User", userSchema);
