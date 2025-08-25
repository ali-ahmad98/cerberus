const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;


const scoreSchema = new mongoose.Schema({
    // index:{type:Number},
    matchDate: {
        type: Date,
    },
    matchTime: {
        type: String,
    },
    awayTeam:{
        type: Number
    },
    homeTeam:{
        type: Number
    },
    awayTeamScore:{type:Number},
    homeTeamScore:{type:Number},
    passing:{type:Object},
    rushing:{type:Object},
    receiving:{type:Object},
    matchVenue:{
        type:String
    },
    date:{type:String},
    status:{
        type:Boolean,
        default: true
    },
    // scheduleWeek:{type:String},
    isDelete:{
        type:Boolean,
        default:false
    },
    week:{type:String},
    maxPass:{type:Object},
    maxRush:{type:Object},
    maxRecv:{type:Object},

},{timestamps:true});



const nfl_Score = new mongoose.model("nfl_score", scoreSchema);
module.exports = nfl_Score;