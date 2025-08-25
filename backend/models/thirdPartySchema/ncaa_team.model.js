const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    team_id: { type: Number },
    team_name: { type: String },
    logo_standard: {type: String},
    team_league: { type: String },
    team_division: { type: String },
    team_position: { type: Number },

    isDelete: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
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



const NcaaTeam = new mongoose.model("ncaa_team", teamSchema);
module.exports = NcaaTeam;