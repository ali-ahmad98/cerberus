const News = require("../../models/thirdPartySchema/news.model");
const {
  sendResponseData,
} = require("../../util/Utility");
var multer = require("multer");

const upload = multer({ dest: "public/files" });

const newsList = async (req, res) => {
  const skipNo = req.query.page - 1;
  try {
    // const newsList = await News.find().sort({ _id: -1 });
    const newsList = await News.find({}).sort({ _id: -1 }).limit(20).skip(skipNo * 20);

    sendResponseData(res, 200, true, "News list", newsList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const newsListCount = async (req, res) => {
  try {
    const dataList = await News.find({}).count();
    sendResponseData(res, 200, true, "News count", dataList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};


const newsChart = async (req, res) => {
  try {
    // const dataList = await News.aggregate([
    //   { $limit: 100 },
    //   { $group: { _id: "$article_date", counter: { $sum: 1 } } },
    //   // {$sort: { article_date: -1 }}
    // ]).exec();


    const dataList = await News.aggregate([
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } }, counter: { $sum: 1 } } },
      { $sort: { article_date: -1 }},
      { $limit: 100 },
    ]).exec();



    sendResponseData(res, 200, true, "News count", dataList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

module.exports = { newsList, newsListCount, newsChart };
