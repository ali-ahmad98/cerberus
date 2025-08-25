const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bannerSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    title: {
        type: String,
        required: true,
        required: true
    },
    sub_title: {
        type: String,
        required: true
    },
    button_name: {
        type: String,
        required: true,
        required: true
    },
    button_url: {
        type: String,
        required: true,
        unique: true
    }, 
    banner_image: {
        type: String,
        required: false,
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

bannerSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

const Banner = new mongoose.model("Banner", bannerSchema);
module.exports = Banner;
