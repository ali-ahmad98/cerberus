const mongoose = require("mongoose");

const nflPlayerStatSchema = new mongoose.Schema({
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

    //FOR defence
    assisted_tackles: { type: String },
    blocked_kicks: { type: String },
    forced_fumbles: { type: String },
    fumbles_recovered: { type: String },
    fumbles_returned_for_touchdowns: { type: String },
    intercepted_returned_yards: { type: String },
    interceptions: { type: String },
    interceptions_returned_for_touchdowns: { type: String },
    longest_interception_return: { type: String },
    name: { type: String },
    passes_defended: { type: String },
    rank: { type: String },
    sacks: { type: String },
    tackles_for_loss: { type: String },
    total_tackles: { type: String },
    unassisted_tackles: { type: String },
    yards_lost_on_sack: { type: String },


    //For scoring

    extra_points: { type: String },
    field_goals: { type: String },
    name: { type: String },
    rank: { type: String },
    receiving_touchdowns: { type: String },
    return_touchdowns: { type: String },
    rushing_touchdowns: { type: String },
    total_points: { type: String },
    total_points_per_game: { type: String },
    total_touchdowns: { type: String },
    two_point_conversions: { type: String },
  




       

    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});



const NflPlayerStats = new mongoose.model("nfl_player_stat", nflPlayerStatSchema);
module.exports = NflPlayerStats;