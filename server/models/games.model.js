const mongoose = require("mongoose")

const Games = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  promptsAndResponses: {
    type: Array,
    required: true,
  },
  className: {
    type: String,
    required: true
  },
  gameName: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Games", Games)