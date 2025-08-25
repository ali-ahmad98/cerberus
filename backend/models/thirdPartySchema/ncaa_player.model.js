const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const ncaaPlayerSchema = new mongoose.Schema({
    player_id: { type: Number },
    team_id: { type: Number },
    name: { type: String },
    active: { type: String },
    star: { type: String },
    position: { type: String },
    team_code: { type: String },
    height: { type: String },
    weight: { type: String },
    dob: { type: String },
    college: { type: String },
    drafted: { type: String },
    number:{type:String},
    age:{type:String},
    profile_img: { type: String,default:'' },


    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    }

});



const NcaaPlayers = new mongoose.model("ncaa_player", ncaaPlayerSchema);
module.exports = NcaaPlayers;