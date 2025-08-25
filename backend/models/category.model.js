const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const categorySchema = new mongoose.Schema({
    title: {
        type:String,
        required: true, 
        unique:true
    },
    permalink: {
        type:String,
        required: true, 
        unique:true
    },
    meta_title: {
        type:String, 
        required: true,
    },
    meta_keyword: {
        type:String, 
    },
    meta_description: {
        type:String,
    },
    status:{
        type:Boolean,
        default: true
    }, 
    created_at:{
        type: Date,
        default: Date.now,
    }, 
    isDelete:{
        type:Boolean,
        default:false
    },
    
});

categorySchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

const Category = new mongoose.model("Category", categorySchema);
module.exports = Category;
