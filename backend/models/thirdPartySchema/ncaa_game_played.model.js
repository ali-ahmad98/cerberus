
const mongoose = require("mongoose");

const ncaa_game_played = new mongoose.Schema({
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



const NCAA_game_played = new mongoose.model("ncaa_game_played", ncaa_game_played);
module.exports = NCAA_game_played;