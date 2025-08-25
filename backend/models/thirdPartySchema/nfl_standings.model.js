const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const nflStandingSchema = new mongoose.Schema({
    team_id:{type:Number}, 
    team_name:{type:String},
    team_leag:{type:String}, 
    team_division:{type:String}, 
    team_position: { type: Number },
    conference_record:{type:String}, 
    difference:{type:String}, 
    division_record:{type:String}, 
    home_record:{type:String}, 
    lost:{type:String}, 
    points_against:{type:String}, 
    points_for:{type:String}, 
    position:{type:String}, 
    road_record:{type:String}, 
    streak:{type:String}, 
    ties:{type:String}, 
    win_percentage:{type:String}, 
    won:{type:String},  
    isDelete:{
        type:Boolean,
        default:false
    },
    status:{
        type:Boolean,
        default: true
    },
    season:{type:Number}
    
},{timestamps:true});



const nfl_standing = new mongoose.model("nfl_standing", nflStandingSchema);
module.exports = nfl_standing;