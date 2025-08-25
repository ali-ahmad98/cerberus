const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const nfl_injury = new mongoose.Schema({
    teamId: {
        type: Number,
    },
    report_date: {
        type: Date,
    },
    report_description: {
        type: String,
    },
    report_status: {
        type: String,
    },
    player_name: {
        type: String,
    },
    player_id:{type:Number},
    isDelete:{
        type:Boolean,
        default:false
    }
    
}, {
    timestamps: true,
  }
);



const nflInjury = new mongoose.model("nfl_injury", nfl_injury);
module.exports = nflInjury;