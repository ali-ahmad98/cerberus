const mongoose = require("mongoose");
const Article = require("../../models/article.model");
const ArticleComments = require("../../models/article_comments.model");
const Category = require("../../models/category.model");
const { sendResponseData, getFilePath, generateValidationErrorResponse } = require("../../util/Utility");

const categoryList = async (req, res) => {
    try {
        const categoryList = await Category.find({ status: true, isDelete: false });

        sendResponseData(res, 200, true, "Category list", categoryList);

    }
    catch (error) {
        sendResponseData(res, 400, false, "Error", error);

    }
}

const articleList = async (req, res) => { 
    try {
        //const articleList = await Article.find().sort({ order_no: 1 }).populate("category");
        var articleListGroup = {};

        const articleList = await Category.aggregate([
            {
                $lookup: {
                    from: "articles",  //the table you want to join
                    localField: "_id", //article table er local filed field that able to join
                    foreignField: "category",
                    as: "Articles",
                }
            },
            { $match: { "Articles.status": true, "Articles.isDelete": false, status: true } },
            { $sort: { 'Articles.order_no' : 1 } },
        ]).exec();

        articleList.forEach((element, index) => {
            var catTitle = element.title;
            var articleList = element.Articles;

            element.Articles.forEach((element) => {
                element.thumbnail = getFilePath(element.thumbnail);

                if (element.title) {
                    articleListGroup[catTitle.toUpperCase()] = articleList;
                }
            })

        });
        sendResponseData(res, 200, true, "Article list", articleListGroup);
    } catch (error) {
        console.log(error);
        sendResponseData(res, 200, false, "Error", error);
    }
}

const articleListByCategory = async (req, res) => {
    const catUrl = req.params.category;

    try {
        const categoryRow = await Category.findOne({ permalink: catUrl  });
        var articleList = {};
        if (categoryRow != null) {
            articleList = await Article.find({ category: categoryRow._id }).sort({ order_no: 1 });

            articleList.forEach((element, index) => {
                element.thumbnail = getFilePath(element.thumbnail);
            });
        }

        sendResponseData(res, 200, true, categoryRow?.title + " article list", articleList);
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
}


const articleDetailsByLink = async (req, res) => {
    const id = req.params.id;
    try {
        const articleRow = await Article.findOne({ _id: id }).populate("category");
        if (articleRow != null) {
            articleRow.thumbnail = getFilePath(articleRow.thumbnail);
            articleRow.video = getFilePath(articleRow.video);
        }

        sendResponseData(res, 200, true, "Article details", articleRow);
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
}

const articleRelatedList = async (req, res) => {
    const not_id = req.params.id;
    try {
        const currentArticle = await Article.findOne({ _id: not_id });
        var categoryId = currentArticle.category;

        const relatedArticleList = await Article.find({ category: categoryId, _id: { $ne: not_id } })
            .limit(3).populate("category");
        relatedArticleList.forEach((element) => {
            element.thumbnail = getFilePath(element.thumbnail);
        });

        const latestArticleList = await Article.find({ category: { $ne: categoryId } })
            .limit(5).populate("category");
        latestArticleList.forEach((element) => {
            element.thumbnail = getFilePath(element.thumbnail);
        });

        var returnList = {};
        returnList['related'] = relatedArticleList;
        returnList['latest'] = latestArticleList;
        sendResponseData(res, 200, true, "Related Article list", returnList);
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
}


const articleCommentsSubmit = async (req, res) => {
    try {
        const userId = req.user_id;

        const newComment = new ArticleComments({
            user_id: userId,
            article_id: req.body.article_id,
            comment_msg: req.body.comment_msg,
        });
        const commentData = await newComment.save();
        sendResponseData(res, 200, true, "Comment added successfully.", {});
    } catch (error) {
        await generateValidationErrorResponse(res, error);
    }
};

const getArticleComments = async (req, res) => {
    const articleId = req.params.articleId;
    // console.log('articleId', articleId);
    try {
        const articleCommentList = await ArticleComments.aggregate([
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: false } },
            { $match: { article_id : mongoose.Types.ObjectId(articleId) } },
            { $sort: { created_at: -1 } },
        ]).exec();

        articleCommentList.forEach((element, index) => {
            var userDetails = element.userDetails;
            userDetails.profile_img = getFilePath(element.profile_img);
        });

        sendResponseData(res, 200, true, "Article comment list", articleCommentList);
    } catch (error) {
        console.log(error);
        sendResponseData(res, 200, false, "Error", error);
    }
};



module.exports = {
    categoryList,
    articleList,
    articleListByCategory,
    articleDetailsByLink,
    articleRelatedList, // For article details page

    articleCommentsSubmit,
    getArticleComments,

};

