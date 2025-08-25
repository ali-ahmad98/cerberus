const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const quickLinkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        //unique: true
    },
    quicklink_view_on: {
        // type: [String],
        type: String,
        required: false,
        default: [],
    },
    page_url: {
        type: String,
        required: true,
       // unique: true
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



const quicklink = new mongoose.model("quicklink", quickLinkSchema);
module.exports = quicklink;