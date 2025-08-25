const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const nfl_depth_chart = new mongoose.Schema({
    team_id: {
        type: Number,
    },
    section_name: {
        type: String,
    },
    position_name: {
        type: String,
    },
    starter_p_id:{type:Number},
    second_p_id:{type:Number},
    third_p_id:{type:Number},
    fourth_p_id:{type:Number},
    isDelete:{
        type:Boolean,
        default:false
    }
    
}, {
    timestamps: true,
  }
);



const nflDepthChart = new mongoose.model("nfl_depth_chart", nfl_depth_chart);
module.exports = nflDepthChart;