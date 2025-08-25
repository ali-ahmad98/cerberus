const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const ncaaStandingSchema = new mongoose.Schema({
    team_id:{type:Number}, //
    leag_name:{type:String}, //
    team_division:{type:String},// 
    conference_lost: { type: Number },//
    conference_points_against:{type:String}, //
    conference_points_for:{type:String}, //
    conference_won:{type:String}, //
    overall_lost:{type:String}, //
    overall_points_against:{type:String}, //
    overall_points_for:{type:String}, //
    position:{type:String}, //
    overall_won:{type:String}, //
    streak:{type:String}, //  
    isDelete:{
        type:Boolean,
        default:false
    },
    status:{
        type:Boolean,
        default: true
    },
    season:{type:Number}//
    
},{timestamps:true});



const ncaa_standing = new mongoose.model("ncaa_standing", ncaaStandingSchema);
module.exports = ncaa_standing;