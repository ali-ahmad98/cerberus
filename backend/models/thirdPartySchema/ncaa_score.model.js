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
    awayTeamScore:{type:Object},
    homeTeamScore:{type:Object},
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
    }
},{timestamps:true});



const ncaa_Score = new mongoose.model("ncaa_score", scoreSchema);
module.exports = ncaa_Score;