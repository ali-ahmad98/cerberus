const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    full_name: {
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }, 
    gander:{
        type:String,
        required: false
    },
    age:{
        type:String,
        required: false
    },
    profile_img:{
        type:String,
        required: false
    }, 
    otp:{
        type:String,
        required: true
    },
    is_verified:{
        type:Boolean,
        default: false
    },
    user_type:{
        type:Number,
        default: 2
    },
    created_at:{
        type: Date,
        default: Date.now,
    }, 
    user_status:{
        type:Boolean,
        default: true
    }, 
});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        // this.confirmPassword = undefined
    }
    next();
});

const User = new mongoose.model("User", userSchema);
module.exports = User;