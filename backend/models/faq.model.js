const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const faqSchema = new mongoose.Schema({
    faq_question: {
        type:String,
        required: true,
        unique: true
    },
    faq_ans_title:{
        type:String,
        required: true,
    },
    faq_ans_description:{
        type:String, 
        required: true,
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

faqSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });


const Faq = new mongoose.model("Faq", faqSchema);
module.exports = Faq;