const ContactUs = require("../../models/contact_us.model");
const Cms = require("../../models/cms.model");
const Faq = require("../../models/faq.model");
const Podcast = require("../../models/porcast.model");
const Video = require("../../models/video.model");
const Category = require("../../models/category.model");
const mailSender = require('../../mailSetup/mail');
const config = require('../../config/config')


const {
  sendResponseData,
  getFilePath,
  generateValidationErrorResponse,
} = require("../../util/Utility");
const News = require("../../models/thirdPartySchema/news.model");
const Article = require("../../models/article.model");

const homePageData = async (req, res) => {
  try {
    const returnData = {};
    const highlightsArticles = await Article.aggregate([
      { $match: { is_highlights: true, status: true, isDelete: false } },
      { $sort: { created_at: -1 } },
      { $limit: 31 },
    ])
    highlightsArticles.forEach((element) => {
      element.thumbnail = getFilePath(element.thumbnail);
    });
    returnData['highlightsArticles'] = highlightsArticles;

    //articles
    const articleList = await Category.aggregate([
      {
        $lookup: {
          from: "articles",  //the table you want to join
          localField: "_id", //article table er local filed field that able to join
          foreignField: "category",
          as: "Articles",
        }
      },
      { $unwind: { path: "$Articles", preserveNullAndEmptyArrays: false } },
      { $match: { "Articles.status": true, "Articles.isDelete": false, status: true } },
      { $sort: { 'Articles.order_no': 1 } },
      {
        $group: {
          _id: { Category: "$title" },
          "doc": { "$first": "$$ROOT" }
        }
      },
      { "$replaceRoot": { "newRoot": "$doc" } },
      {
        $project: {
          // _id:0,
          title: 1,
          Articles: 1
        }
      }
      // {$limit:{"Articles":1}}
    ]).exec();

    articleList.forEach((element, index) => {

      element.Articles.thumbnail = getFilePath(element.Articles.thumbnail);
    });

    returnData['homePageTopSectionArticles'] = articleList;


    sendResponseData(res, 200, true, "Home Page Data", returnData);
  } catch (error) {
    sendResponseData(res, 400, false, "Error", error);
  }
}



const homePageNewsContentData = async (req, res) => {
  try {
    const newsList = await News.aggregate([
      { $match: { isDelete: false } },
      { $sort: { article_date: -1 } },
      { $limit: 6 },
    ])
    sendResponseData(res, 200, true, "Home Page news Data", newsList);
  } catch (error) {
    sendResponseData(res, 400, false, "Error", error);
  }
}


const homePageArticleVideos = async (req, res) => {
  try {
    const homePageVideos = await Article.aggregate([
      { $match: { "status": true, "isDelete": false } },
      { $sort: { video: -1 } },
      { $limit: 10 }
    ]).exec();

    homePageVideos.forEach((element, index) => {
      element.thumbnail = getFilePath(element.thumbnail);
      if (element.video != null) {
        element.video = getFilePath(element.video);
      }
    });

    sendResponseData(res, 200, true, "Article list", homePageVideos);
  } catch (error) {
    console.log(error);
    sendResponseData(res, 400, false, "Error", error);
  }

}


const podcastList = async (req, res) => {
  try {
    const pageBy = req.query.page;
    const limit = Number(req.query.limit);
    let query = {
      status: true
    };

    if (pageBy) {
      query = {
        $and: [{ status: true }, { podcast_view_on: { $regex: pageBy, $options: 'i' } }]
      }

    }
    // const podcastList = await Podcast.find({ status: true }).sort({ _id: -1 });
    const podcastList = await Podcast.find(query).sort({ _id: -1 }).limit(limit);


    podcastList.forEach((element) => {
      element.image = getFilePath(element.image);
      element.audio = getFilePath(element.audio);
    });
    sendResponseData(res, 200, true, "Podcast list", podcastList);
  } catch (error) {
    sendResponseData(res, 400, false, "Error", error);
  }
};

const faqList = async (req, res) => {
  try {
    const faqList = await Faq.find({ status: true }).sort({ _id: -1 });
    sendResponseData(res, 200, true, "FAQ list", faqList);
  } catch (error) {
    sendResponseData(res, 400, false, "Error", error);
  }
};

const cmsdetailsByUrl = async (req, res) => {
  const url = req.params.url;
  try {
    const cmsdata = await Cms.findOne({ cms_url: url });
    cmsdata.image = getFilePath(cmsdata.image);
    sendResponseData(res, 200, true, "CMS Data", cmsdata);
  } catch (error) {
    sendResponseData(res, 400, false, "Error", error);
  }
};

const contactUsSubmit = async (req, res) => {
  try {
    const newContactUs = new ContactUs({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      phone: req.body.phone,
      address: req.body.address,
      message: req.body.message,
      ip: req.socket.remoteAddress,
    });
    const contactUsData = await newContactUs.save();
    let supportEmail = config.email.SUPPORT_EMAIL;
    mailSender('supportUsMail')(supportEmail,
      {
            // name: userData.full_name,
            userName: req.body.name,
            userEmail: req.body.email,
            userPhone: req.body.phone,
            userAdd: req.body.address,
            userMsg: req.body.message,
            header_color: config.siteConfig.HEADERCOLOR,
            footer_color: config.siteConfig.FOOTERCOLOR,
            site_name: config.siteConfig.SITENAME,
            currentYear: new Date().getFullYear(),
            logo:config.siteConfig.LOGO
      }).send();
    sendResponseData(
      res,
      200,
      true,
      "Form submitted successfully.",
      contactUsData
    );
  } catch (error) {
    await generateValidationErrorResponse(res, error);
    //   sendResponseData(res, 200, false, "Error", error);
  }
};

const videoList = async (req, res) => {
  const pageBy = req.query.page;
  const limit = Number(req.query.limit);
  let query = {
    status: true
  };

  if (pageBy) {
    query = {
      $and: [{ status: true }, { video_view_on: { $regex: pageBy, $options: 'i' } }]
    }

  }
  try {
    // const VideoList = await Video.find({ status: true }).sort({ _id: -1 });
    const VideoList = await Video.find(query).sort({ _id: -1 }).limit(limit);

    VideoList.forEach((element) => {
      element.thumbnail_image = getFilePath(element.thumbnail_image);
      element.video = getFilePath(element.video);
    });
    sendResponseData(res, 200, true, "Video list", VideoList);
  } catch (error) {
    sendResponseData(res, 400, false, "Error", error);
  }
};

const videoByPage = async (req, res) => {
  const pageBy = req.query.page;
  const limit = Number(req.query.limit);
  console.log(req.query);
  try {
    const videoByPageList = await Video.find(
      {
        $and: [{ status: true }, { video_view_on: { $regex: pageBy, $options: 'i' } }]
      }).sort({ _id: -1 }).limit(limit);

    // videoByPageList.forEach((element) => {
    //   element.thumbnail_image = getFilePath(element.thumbnail_image);
    //   element.video = getFilePath(element.video);
    // });
    sendResponseData(res, 200, true, "Video list", videoByPageList);

  }
  catch (error) {
    sendResponseData(res, 400, false, "Error", error);
  }

}


module.exports = {
  homePageArticleVideos,
  homePageData,
  homePageNewsContentData,
  podcastList,
  faqList,
  cmsdetailsByUrl,
  videoList,
  contactUsSubmit,
  videoByPage

};
