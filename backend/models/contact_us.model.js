const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true, 
    },
    email:{
        type:String,
        required: true,
    },
    phone:{
        type:String, 
        required: true,
    }, 
    address:{
        type:String, 
        required: true,
    },
    message:{
        type:String, 
        required: true,
    }, 
    ip:{
        type:String,
        required: false
    },
    is_read:{
        type:Boolean,
        default: false
    }, 
    created_at:{
        type: Date,
        default: Date.now,
    }, 
});



const ContactUs = new mongoose.model("Contact_Us", ContactUsSchema);
module.exports = ContactUs;