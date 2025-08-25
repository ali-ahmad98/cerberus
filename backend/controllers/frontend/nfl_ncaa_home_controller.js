const Article = require("../../models/article.model");
const Banner = require("../../models/banner.model");
const Category = require("../../models/category.model");
const News = require("../../models/thirdPartySchema/news.model");
const { getFilePath, sendResponseData } = require("../../util/Utility");


const getHomeBanner = async (req, res) => {
    const categoryName = req.query.category;
    console.log('categoryName', categoryName);

    try {
        const categoryRow = await Category.findOne({ title: categoryName.toUpperCase() });
        var bannerList = {};
        if (categoryRow != null) {
            bannerList = await Banner.find({ category: categoryRow._id, status: true, isDelete: false });

            bannerList.forEach((element, index) => {
                element.banner_image = getFilePath(element.banner_image);
            });
        }

        sendResponseData(res, 200, true, "Banner list", bannerList);
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
}


const getTopHeadlineArticle = async (req, res) => {
    const categoryName = req.query.category;
    const limit = req.query.limit;
    console.log('categoryName', categoryName);
    try {
        const categoryRow = await Category.findOne({ title: categoryName.toUpperCase() });
        var articleList = {};
        if (categoryRow != null) {
            // articleList = await Article.find({ category: categoryRow._id, is_highlights: true })
            //     .limit(Number(limit));
                articleList = await Article.aggregate([{$sample:{size: Number(limit)}}]);

            articleList.forEach((element, index) => {
                element.thumbnail = getFilePath(element.thumbnail);
            });
        }

        sendResponseData(res, 200, true, "Top Headline list", articleList);
    }
    catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }

}


const getTopHeadlineNews = async (req, res) => {
    const categoryName = req.query.category;
    const limit = req.query.limit;
    console.log('categoryName', categoryName);
    try {
        newsList = await News.find({ isDelete: false }).limit(Number(limit));


        sendResponseData(res, 200, true, "Top Headline news list", newsList);
    }
    catch (error) {
        sendResponseData(res, 200, false, "Error", error);

    }

}


const getPlayerProfileHighlightArticle = async (req, res) => {
    // const categoryName = req.query.category;
    // console.log('categoryName', categoryName);
    try {
        articleList = await Article.find({ isDelete: false, status: true, is_highlights: true });
        articleList.forEach((element) => {
            element.thumbnail = getFilePath(element.thumbnail);
        })
        sendResponseData(res, 200, true, "Top article List", articleList);
    }
    catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }

}




module.exports = {
    getHomeBanner,

    getTopHeadlineArticle,
    getTopHeadlineNews,


    getPlayerProfileHighlightArticle,
};
