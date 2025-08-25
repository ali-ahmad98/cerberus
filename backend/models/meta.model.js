const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const metaSchema = new mongoose.Schema({
    page_url: {
        type: String,
        required: true,
        unique: true
    },
    meta_title: {
        type: String,
        required: true
    },
    meta_description: {
        type: String,
        required: true,
    },
    meta_keyword: {
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

metaSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

const Meta = new mongoose.model("Meta", metaSchema);
module.exports = Meta;
