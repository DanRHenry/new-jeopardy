const mongoose = require("mongoose");

const QuestionsAndAnswers = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  question: {
    type: Object,
    required: true,
  },
  answer: {
    type: Object,
    required: true,
  },
  defaultCategory: {
    type: String,
    required: true
  },
  defaultClass: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("QuestionsAndAnswers", QuestionsAndAnswers);
