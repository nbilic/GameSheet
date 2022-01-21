const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    display_name: {
      type: String,
      required: true,
    },
    twitchId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
