const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;


const playerGameLogSchema = new mongoose.Schema({
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
    date:{type:String},
    status:{
        type:Boolean,
        default: true
    },
    isDelete:{
        type:Boolean,
        default:false
    }

},{timestamps:true});



const game_log = new mongoose.model("game_log", playerGameLogSchema);
module.exports = game_log;