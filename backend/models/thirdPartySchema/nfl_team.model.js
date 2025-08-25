const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    team_code: {
        type: String,
    },
    team_name:{
        type:String,
    },
    logo_small:{
        type:String,
    },
    logo_medium:{
        type:String,
    },
    logo_standard:{
        type:String,
    },
    logo_helmet:{
        type:String,
    },   
    team_id:{type:Number}, 
    team_leag:{type:String}, 
    team_division:{type:String}, 
    team_position: { type: Number },
    // conference_record:{type:String}, 
    // difference:{type:String}, 
    // division_record:{type:String}, 
    // home_record:{type:String}, 
    // lost:{type:String}, 
    // points_against:{type:String}, 
    // points_for:{type:String}, 
    // position:{type:String}, 
    // road_record:{type:String}, 
    // streak:{type:String}, 
    // ties:{type:String}, 
    // win_percentage:{type:String}, 
    // won:{type:String},  
    isDelete:{
        type:Boolean,
        default:false
    },
    status:{
        type:Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
    
});



const nfl_team = new mongoose.model("nfl_team", teamSchema);
module.exports = nfl_team;