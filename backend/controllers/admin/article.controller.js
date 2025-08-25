const Article = require("../../models/article.model");
const { sendResponseData, fileUpload, getFilePath, generateValidationErrorResponse } = require("../../util/Utility");

const articleList = async (req, res) => {
  try {
    const articleList = await Article.find().sort({ category: 1, order_no: 1 }).populate("category");

    articleList.forEach(element => {
      element.thumbnail = getFilePath(element.thumbnail);
      element.video = getFilePath(element.video);
      // console.log(element);
    });
    sendResponseData(res, 200, true, "Article list", articleList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const articleAdd = async (req, res) => {
   console.log("ijhfkvhkfhhfjvhjfhjvh===========",req.body);
  try {
    if(!req.body.category || req.body.category == "" || req.body.category == undefined || req.body.category == null){
      sendResponseData(res, 200, false, "category id is required", {});
      }
    else{  
    var thumbnailFileName = '';
    var videoFileName = '';
    if (req.files) {
      if (req.files.thumbnail) {
        var imgFile = req.files.thumbnail[0];
        thumbnailFileName = await fileUpload(imgFile, 'article', 'thumbnail');
      }
      if (req.files.video) {
        var imgFile = req.files.video[0];
        videoFileName = await fileUpload(imgFile, 'article', 'video');
      }
    }

    const newArticle = new Article({
      category: req.body.category,
      title: req.body.title,
      permalink: req.body.permalink,
      author_name: req.body.author_name,
      sub_title: req.body.sub_title,
      description: req.body.description,
      meta_title: req.body.meta_title,
      meta_keyword: req.body.meta_keyword,
      meta_description: req.body.meta_description,
      thumbnail: thumbnailFileName,
      video: videoFileName,
    });
    const articleData = await newArticle.save();
    sendResponseData(res, 200, true, "Article added successfully", articleData);
    }
  } catch (error) {
  console.log("error===========",error);
    await generateValidationErrorResponse(res, error);
  }
}


const articleDetails = async (req, res) => {
  const articleId = req.params.id;
  try {
    const articleData = await Article.findOne({ _id: articleId });
    articleData.thumbnail = getFilePath(articleData.thumbnail);
    articleData.video = getFilePath(articleData.video);
    sendResponseData(res, 200, true, "Article data", articleData);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const articleUpdate = async (req, res) => {
  const id = req.body.id;
  try {
    if (
      !req.body.hasOwnProperty("id") ||
      !req.body.hasOwnProperty("title") ||
      !req.body.hasOwnProperty("sub_title") ||
      !req.body.hasOwnProperty("description")
    ) {
      sendResponseData(res, 200, false, "Input validation failed", {});
    }
    const rowData = await Article.findOne({ _id: id });
    var thumbnailPath = rowData.thumbnail;
    var videoPath = rowData.video;

    var thumbnailFileName = thumbnailPath;
    var videoFileName = videoPath;

    if (req.files) {
      if (req.files.thumbnail) {
        var imgFile = req.files.thumbnail[0];
        thumbnailFileName = await fileUpload(imgFile, 'article', 'thumbnail');
      }
      if (req.files.video) {
        var imgFile = req.files.video[0];
        videoFileName = await fileUpload(imgFile, 'article', 'video');
      }
    }
console.log("======================",req.body);

    const articleData = {
      category: req.body.category,
      title: req.body.title,
      permalink: req.body.permalink,
      author_name: req.body.author_name,
      sub_title: req.body.sub_title,
      description: req.body.description,
      meta_title: req.body.meta_title,
      meta_keyword: req.body.meta_keyword,
      meta_description: req.body.meta_description,
      thumbnail: thumbnailFileName,
      video: videoFileName,
    }
console.log("======================",articleData );
    const updateData = await Article.findOneAndUpdate({ _id: id }, {$set:articleData}, { runValidators: true ,context: 'query', new:true});
    sendResponseData(res, 200, true, "Article updated successfully", updateData);
  } catch (error) {
console.log("======================",error)
    await generateValidationErrorResponse(res, error);
  }
}



const articleUpdateStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const articleData = await Article.findOne({ _id: id });
    if (articleData) {
      const updateDataField = {
        status: !articleData.status,
      }
      const updateData = await Article.updateOne({ _id: id }, updateDataField);
      sendResponseData(res, 200, true, "Status updated successfully", updateData);
    }
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const articleDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const rowData = await Article.findOne({ _id: id });
    if (rowData) {
      const deleteData = await Article.deleteOne({ _id: id });

      // console.log(updateDataField);
      sendResponseData(res, 200, true, "Deleted successfully");
    }
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const articleOrderNoUpdate = async (req, res) => {
  const id = req.body.id;
  try {
    if (
      !req.body.hasOwnProperty("id") ||
      !req.body.hasOwnProperty("order_no")
    ) {
      sendResponseData(res, 200, false, "Input validation failed", {});
    }

    const articleData = {
      order_no: req.body.order_no,
    }

    const updateData = await Article.updateOne({ _id: id }, articleData, { runValidators: true });
    sendResponseData(res, 200, true, "Updated successfully", updateData);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}

const articleHighlightsUpdate = async (req, res) => {
  const id = req.body.id;
  try {
    if (
      !req.body.hasOwnProperty("id") ||
      !req.body.hasOwnProperty("is_highlights")
    ) {
      sendResponseData(res, 200, false, "Input validation failed", {});
    }

    const articleData = {
      is_highlights: req.body.is_highlights,
    }

    const updateData = await Article.updateOne({ _id: id }, articleData, { runValidators: true });
    sendResponseData(res, 200, true, "Updated successfully", updateData);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}

module.exports = {
  articleList, articleAdd, articleDetails, articleUpdate,
  articleUpdateStatus, articleDelete, articleOrderNoUpdate,
  articleHighlightsUpdate
}
