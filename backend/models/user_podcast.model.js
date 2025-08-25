const mongoose = require("mongoose");

const userPodcastListSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    podcast_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Podcast'
    }],  
    status: {
        type: Boolean,
        default: true
    },

},{timestamps:true});



const userPodcastList = new mongoose.model("user_podcast_list", userPodcastListSchema);
module.exports = userPodcastList;