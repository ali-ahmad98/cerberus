const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const teamStatSchema = new mongoose.Schema({
      
    team_id:{type:Number}, 
    season: { type: Number },
    stat_category: { type: String },
    team:{},
    opponents:{},      
    isDelete:{
        type:Boolean,
        default:false
    },
    status:{
        type:Boolean,
        default: true
    }
    
},{timestamps:true});


const nfl_team_stat = new mongoose.model("nfl_team_stat", teamStatSchema);
module.exports = nfl_team_stat;