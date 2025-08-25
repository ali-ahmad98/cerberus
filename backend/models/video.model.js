const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    sub_title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail_image: {
        type: String,
        required: false,
    },
    video: {
        type: String,
        required: false,
    },
    video_view_on: {
        // type: [String],
        type: String,
        required: false,
        default: [],
    },
    total_download: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

videoSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });


const Video = new mongoose.model("Video", videoSchema);
module.exports = Video;
