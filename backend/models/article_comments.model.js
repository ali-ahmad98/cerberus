const mongoose = require("mongoose");

const articleCommentsSchema = new mongoose.Schema({
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment_msg: {
        type: String,
        required: true
    },  
    created_at: {
        type: Date,
        default: Date.now,
    }, 
    status: {
        type: Boolean,
        default: true
    },

});



const ArticleComments = new mongoose.model("article_comment", articleCommentsSchema);
module.exports = ArticleComments;