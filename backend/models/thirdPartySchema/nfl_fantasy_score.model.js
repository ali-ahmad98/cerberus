const mongoose = require("mongoose");

const nflFantasyScoreSchema = new mongoose.Schema({
    // stat_id: { type: Number },
    team_id: { type: Number },
    player_id: { type: Number },
    player_name: { type: String },
    season: { type: Number },
    // stat_category: { type: String },
    Passing:{type:Array},
    Rushing:{type:Array},
    Receiving:{type:Array},
    Defense:{type:Array},
    Scoring:{type:Array},

    // // For Passing =======>
    // completion_pct: { type: Number },
    // completions: { type: Number },
    // passing_interceptions: { type: Number },
    // interceptions_pct: { type: Number },
    // longest_pass: { type: Number },
    // passing_attempts: { type: Number },
    // passing_touchdowns: { type: Number },
    // passing_touchdowns_pct: { type: Number },
    // quaterback_rating: { type: Number },
    // sacked_yards_lost: { type: Number },
    // passing_sacks: { type: Number },
    // passing_rank: { type: Number },
    // passing_yards: { type: Number },
    // pass_yards_per_game: { type: Number },
    // yards_per_pass_avg: { type: Number },

    // // For Rushing =======>
    // rush_fumbles: { type: Number },
    // rush_fumbles_lost: { type: Number },
    // longest_rush: { type: Number },
    // rush_over_20_yards: { type: Number },
    // rushing_rank: { type: Number },
    // rushing_attempts: { type: Number },
    // rushing_first_downs: { type: Number },
    // rushing_touchdowns: { type: Number },
    // rushing_yards: { type: Number },
    // rush_yards_per_game: { type: Number },
    // yards_per_rush_avg: { type: Number },


    // // For Receiving =======>
    // rec_fumbles: { type: Number },
    // rec_fumbles_lost: { type: Number },
    // longest_reception: { type: Number },
    // rec_over_20_yards: { type: Number },
    // receiving_first_downs: { type: Number },
    // receiving_targets: { type: Number },
    // receiving_touchdowns: { type: Number },
    // receiving_yards: { type: Number },
    // receptions: { type: Number },
    // yards_after_catch: { type: Number },
    // rec_yards_per_game: { type: Number },
    // yards_per_reception_avg: { type: Number },

    // //FOR defence
    // assisted_tackles: { type: Number },
    // blocked_kicks: { type: Number },
    // forced_fumbles: { type: Number },
    // fumbles_recovered: { type: Number },
    // fumbles_returned_for_touchdowns: { type: Number },
    // intercepted_returned_yards: { type: Number },
    // defence_interceptions: { type: Number },
    // interceptions_returned_for_touchdowns: { type: Number },
    // longest_interception_return: { type: Number },
    // name: { type: String },
    // passes_defended: { type: Number },
    // defence_rank: { type: Number },
    // defence_sacks: { type: Number },
    // tackles_for_loss: { type: Number },
    // total_tackles: { type: Number },
    // unassisted_tackles: { type: Number },
    // yards_lost_on_sack: { type: Number },


    // //For scoring

    // extra_points: { type: Number },
    // field_goals: { type: Number },
    // name: { type: String },
    // scoring_rank: { type: Number },
    // receiving_score_touchdowns: { type: Number },
    // return_touchdowns: { type: Number },
    // rushing_score_touchdowns: { type: Number },
    // total_points: { type: Number },
    // total_points_per_game: { type: Number },
    // total_touchdowns: { type: Number },
    // two_point_conversions: { type: Number },    

    // fpts:{type:Number},
    // fpts_per_g:{type:Number},    
    std_ftp:{type:String},
    half_ppr_ftp:{type:String},
    half_ppr_tep_ftp:{type:String},
    ppr:{type:String},
    ppr_tep:{type:String},
    sfb:{type:String},

    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});



const nflFantasyScore = new mongoose.model("nfl_fantasy_score", nflFantasyScoreSchema);
module.exports = nflFantasyScore;