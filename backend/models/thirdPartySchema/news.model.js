const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
    article_headline: {
        type: String,
    },
    article_date: {
        type: String,
    },
    article_author: {
        type: String,
    },
    article_excerpt: {
        type: String,
    },
    article_link: {
        type: String,
    },
    playerIds:{type:[String],default:[]},
    teams:{type:[String],default:[]},
    isDelete:{
        type:Boolean,
        default:false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    player_imgs:{type:String,default:''},
    team_imgs:{type:String,default:''},

});



const News = new mongoose.model("News", newSchema);
module.exports = News;