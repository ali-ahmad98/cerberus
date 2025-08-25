const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const nfl_roster = new mongoose.Schema({
    teamId: {
        type: Number,
    },
    player_id:{type:Number},
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

    isDelete:{
        type:Boolean,
        default:false
    }
    
}, {
    timestamps: true,
  }
);



const nfl_Roster = new mongoose.model("nfl_roster", nfl_roster);
module.exports = nfl_Roster;