const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const cmsSchema = new mongoose.Schema({
    cms_title: {
        type:String,
        required: true
    },
    cms_sub_title: {
        type:String,
        required: true
    },
    cms_url:{
        type:String,
        required: true,
        unique: true
    },
    cms_description:{
        type:String, 
        required: true,
    }, 
    meta_title:{
        type:String,
        required: true, 
    },
    meta_keyword:{
        type:String,
        required: false, 
    },
    meta_description:{
        type:String,
        required: false, 
    },
    image:{
        type:String,
        required: false, 
    },
    status:{
        type:Boolean,
        default: true
    }, 
    created_at:{
        type: Date,
        default: Date.now,
    }, 
});

cmsSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

const Cms = new mongoose.model("Cms", cmsSchema);
module.exports = Cms;
