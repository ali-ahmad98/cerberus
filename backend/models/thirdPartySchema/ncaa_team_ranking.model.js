const mongoose = require("mongoose");

const ncaaTeamRankingSchema = new mongoose.Schema({ 
    team_id: { type: Number },
    team_points: { type: Number },
    team_position: { type: String },
    prev_rank: { type: String },
    record: { type: String },
    rank_type: { type: String },
    session: { type: Number }, 
   

    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});



const NcaaTeamRanking = new mongoose.model("ncaa_team_ranking", ncaaTeamRankingSchema);
module.exports = NcaaTeamRanking;