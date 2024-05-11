const mongoose = require("mongoose");
const { isEmail } = require("validator");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: isEmail,
    },
    password: { type: String, required: true, minlength: 3 },
    tempPassword: { type: String, required: false },
    active: { type: Boolean, required: true, default: false },
    favourites: {
      type: mongoose.Schema.Types.Array,
      required: false,
      default: [],
    },
    level: { type: String, required: false, default: "" },
    tags: { type: String, required: false, default: "" },
    roadmaps: {
      type: mongoose.Schema.Types.Array,
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

module.exports = User;
