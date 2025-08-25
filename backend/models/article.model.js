const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const articleSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    title: {
        type: String,
        required: true
    },
    permalink: {
        type: String,
        required: true,
        unique: true
    },
    author_name: {
        type: String,
        required: true
    },
    sub_title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    video: {
        type: String,
        required: false,
    },
    order_no: {
        type: Number,
        required: false,
    },
    meta_title: {
        type: String,
        required: true,
    },
    meta_keyword: {
        type: String,
        required: false,
    },
    meta_description: {
        type: String,
        required: false,
    }, 
    is_highlights: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    isDelete: {
        type: Boolean,
        default: false
    },

});

// Apply the uniqueValidator plugin to articleSchema.
articleSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

const Article = new mongoose.model("Article", articleSchema);
module.exports = Article;