const mongoose = require("mongoose");

const ncaaPlayerStatSchema = new mongoose.Schema({
    stat_id: { type: Number },
    team_id: { type: Number },
    player_id: { type: Number },
    player_name: { type: String },
    season: { type: Number },
    stat_category: { type: String },

    // For Passing =======>
    completion_pct: { type: String },
    completions: { type: String },
    interceptions: { type: String },
    interceptions_pct: { type: String },
    longest_pass: { type: String },
    passing_attempts: { type: String },
    passing_touchdowns: { type: String },
    passing_touchdowns_pct: { type: String },
    quaterback_rating: { type: String },
    sacked_yards_lost: { type: String },
    sacks: { type: String },

    rank: { type: Number },
    yards: { type: String },
    yards_per_game: { type: String },
    yards_per_pass_avg: { type: String },
 


    // For Rushing =======>
    fumbles: { type: String },
    fumbles_lost: { type: String },
    longest_rush: { type: String },
    over_20_yards: { type: String },
    rank: { type: Number },
    rushing_attempts: { type: String },
    rushing_first_downs: { type: String },
    rushing_touchdowns: { type: String },
    yards: { type: String },
    yards_per_game: { type: String },
    yards_per_rush_avg: { type: String },

  

    // For Receiving =======>
    fumbles: { type: String },
    fumbles_lost: { type: String },
    longest_reception: { type: String },
    over_20_yards: { type: String },
    receiving_first_downs: { type: String },
    receiving_targets: { type: String },
    receiving_touchdowns: { type: String },
    receiving_yards: { type: String },
    receptions: { type: String },
    yards_after_catch: { type: String },
    yards_per_game: { type: String },
    yards_per_reception_avg: { type: String },
  

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



const NcaaPlayerStats = new mongoose.model("ncaa_player_stat", ncaaPlayerStatSchema);
module.exports = NcaaPlayerStats;