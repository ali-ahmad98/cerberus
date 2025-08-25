const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    team_id: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'User'
    },
    is_follow: {
        type: Boolean,
        default: false
    },
    team_type: {
        type: String, // nfl,ncaa
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



const FollowTeams = new mongoose.model("follow_team", followSchema);
module.exports = FollowTeams;