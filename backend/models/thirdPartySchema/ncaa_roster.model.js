const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const ncaa_roster = new mongoose.Schema({
    teamId: {
        type: Number,
    },
    team_position: {
        type: String,
    },
    player_position: {
        type: String,
    },
    player_age: {
        type: String,
    },
    player_height: {
        type: String,
    },
    player_weight:{type:String},
    player_exp:{type:String},
    player_college:{type:String},
    player_name:{type:String},
    player_id:{type:Number},

    isDelete:{
        type:Boolean,
        default:false
    }
    
}, {
    timestamps: true,
  }
);



const ncaa_Roster = new mongoose.model("ncaa_roster", ncaa_roster);
module.exports = ncaa_Roster;