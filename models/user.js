const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, require: true, unique: true, min: 8 },
    firstName: { type: String, require: true, min: 3, max: 15 },
    lastName: { type: String, require: true, min: 3, max: 15 },
    password: { type: String, require: true },
    dob: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);