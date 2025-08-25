const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const podcastSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        unique: true
    },
    sub_title:{
        type:String,
        required: true,
    },
    podcast_time:{
        type:String, 
        required: true,
    }, 
    image:{
        type:String, 
        required: false,
    }, 
    audio:{
        type:String, 
        required: false,
    }, 
    total_download:{
        type:Number, 
        default: 0,
    }, 
    status:{
        type:Boolean,
        default: true
    }, 
    created_at:{
        type: Date,
        default: Date.now,
    }, 
    podcast_view_on: {
         type: [String],
        //type: String,
        required: false,
        default: [],
    },
});

podcastSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

const Podcast = new mongoose.model("Podcast", podcastSchema);
module.exports = Podcast;
