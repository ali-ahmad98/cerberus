const Banner = require("../../models/banner.model");
const { sendResponseData, fileUpload, getFilePath, generateValidationErrorResponse } = require("../../util/Utility");

const bannerList = async (req, res) => {
  try {
    const dataList = await Banner.find().sort({ category: 1 }).populate("category");

    dataList.forEach(element => {
      element.banner_image = getFilePath(element.banner_image);
    });
    sendResponseData(res, 200, true, "Banner list", dataList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const bannerAdd = async (req, res) => {
  // console.log(req.body);
  try {
    var thumbnailFileName = '';
    if (req.files) {
      if (req.files.banner_image) {
        var imgFile = req.files.banner_image[0];
        thumbnailFileName = await fileUpload(imgFile, 'banner', 'banner_image');
      }
    }

    const newData = new Banner({
      category: req.body.category,
      title: req.body.title,
      sub_title: req.body.sub_title,
      button_name: req.body.button_name,
      button_url: req.body.button_url,
      banner_image: thumbnailFileName,
    });
    const savedData = await newData.save();
    sendResponseData(res, 200, true, "Banner added successfully", savedData);
  } catch (error) {
    await generateValidationErrorResponse(res, error);
  }
}


const bannerDetails = async (req, res) => {
  const bannerId = req.params.id;
  try {
    const bannerData = await Banner.findOne({ _id: bannerId });
    bannerData.banner_image = getFilePath(bannerData.banner_image);

    sendResponseData(res, 200, true, "Banner data", bannerData);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const bannerUpdate = async (req, res) => {
  const id = req.body.id;
  try {
    const rowData = await Banner.findOne({ _id: id });
    var thumbnailPath = rowData.banner_image;

    var thumbnailFileName = thumbnailPath;

    if (req.files) {
      if (req.files.banner_image) {
        var imgFile = req.files.banner_image[0];
        thumbnailFileName = await fileUpload(imgFile, 'banner', 'banner_image');
      }
    }


    const updateDataVal = {
      category: req.body.category,
      title: req.body.title,
      sub_title: req.body.sub_title,
      button_name: req.body.button_name,
      button_url: req.body.button_url,
      banner_image: thumbnailFileName,
    }

   // const updateData = await Banner.updateOne({ _id: id }, updateDataVal, { runValidators: true });
 const updateData = await Banner.findOneAndUpdate({ _id: id }, {$set:updateDataVal}, { runValidators: true ,context: 'query', new:true});
    //sendResponseData(res, 200, true, "Article updated successfully", updateData);

    sendResponseData(res, 200, true, "Banner updated successfully", updateData);
  } catch (error) {
    await generateValidationErrorResponse(res, error);
  }
}



const bannerUpdateStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const bannerData = await Banner.findOne({ _id: id });
    if (bannerData) {
      const updateDataField = {
        status: !bannerData.status,
      }
      const updateData = await Banner.updateOne({ _id: id }, updateDataField);
      sendResponseData(res, 200, true, "Status updated successfully", updateData);
    }
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}



module.exports = {
  bannerList, bannerAdd, bannerDetails, bannerUpdate, bannerUpdateStatus,
}
