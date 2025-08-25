const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;


const scheduleSchema = new mongoose.Schema({
    index:{type:Number},
    sheduleDate: {
        type: Date,
    },
    sheduleTime: {
        type: String,
    },
    awayTeam:{
        type: Number
    },
    homeTeam:{
        type: Number
    },
    // awayTeam:{
    //     type: String,
    // },
    // homeTeam:{
    //     type: String,
       
    // },
    venue:{
        type:String
    },
    date:{type:String},
    status:{
        type:Boolean,
        default: true
    },
    scheduleWeek:{type:String},
    isDelete:{
        type:Boolean,
        default:false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    year:{type:Number}
});



const nfl_Schedule = new mongoose.model("nfl_schedule", scheduleSchema);
module.exports = nfl_Schedule;