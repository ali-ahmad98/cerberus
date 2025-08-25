
const mongoose = require("mongoose");

const nfl_game_played = new mongoose.Schema({
    player_id: {
        type: Number,
    },
    match_date: {
        type: Date,
    },
    status: {
        type: Boolean,
        default: true
    },

});



const NFL_game_played = new mongoose.model("nfl_game_played", nfl_game_played);
module.exports = NFL_game_played;