const mongoose = require("mongoose");

const Category = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true
    },
    questions: {
        type: Object,
        required: true,
    },
    answers: {
        type: Object,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Category", Category);