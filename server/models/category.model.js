const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true
    },
    prompts: {
        type: Array,
        required: true,
    },
    responses: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Category", CategorySchema);