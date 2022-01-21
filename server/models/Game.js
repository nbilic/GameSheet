const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    gameId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "No description available",
    },
    imageUrl: {
      type: String,
    },
    platforms: {
      type: [String],
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    developers: {
      type: [String],
      required: true,
    },
    publisher: {
      type: [String],
      required: true,
    },
    releaseDates: {
      type: Object,
    },
    dlc: {
      type: [Object],
    },
    timeToBeat: {
      type: [Object],
    },
    status: {
      type: String,
      required: true,
    },
    played: {
      type: String,
      default: "Not played",
    },
    addedBy: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    liked: {
      type: [],
    },
    disliked: {
      type: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
