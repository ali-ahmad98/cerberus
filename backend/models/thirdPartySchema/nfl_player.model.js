const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const nflPlayerSchema = new mongoose.Schema({
    player_id: { type: Number },
    team_id: { type: Number },
    name: { type: String },
    profile_img: { type: String,default:'' },
    active: { type: String },
    star: { type: String },
    position: { type: String },
    team_code: { type: String },
    height: { type: String },
    weight: { type: String },
    dob: { type: String },
    college: { type: String },
    drafted: { type: String ,default:''},
    number:{type:String},
    age:{type:String},

    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    }

});



const NflPlayers = new mongoose.model("nfl_player", nflPlayerSchema);
module.exports = NflPlayers;