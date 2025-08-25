const QuickLink = require("../../models/quicklink.model");
const { sendResponseData, getFilePath, generateValidationErrorResponse } = require("../../util/Utility");

const quickLinkList = async (req, res) => {
  try {
    const quickLinkList = await QuickLink.find().limit(20)
      .skip(0).sort({ _id: -1 });
    sendResponseData(res, 200, true, "QuickLink list", quickLinkList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}

const quickLinkAdd = async (req, res) => {
  try {

    const newQuickLink = new QuickLink({
      page_url: req.body.page_url,
      title: req.body.title,
      quicklink_view_on: req.body.quicklink_view_on,
    });

    const quickLinkData = await newQuickLink.save();
    sendResponseData(res, 200, true, "QuickLink added successfully", quickLinkData);
  } catch (error) {
    await generateValidationErrorResponse(res, error);
  }
}

const quickLinkDetails = async (req, res) => {
  const linkId = req.params.id;
  try {
    const quickLinkData = await QuickLink.findOne({ _id: linkId });
    sendResponseData(res, 200, true, "QuickLink data", quickLinkData);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}

const quickLinkUpdate = async (req, res) => {
  const linkId = req.body.id;
  try {
    if (
      !req.body.hasOwnProperty("id") ||
      !req.body.hasOwnProperty("page_url") ||
      !req.body.hasOwnProperty("title") ||
      !req.body.hasOwnProperty("quicklink_view_on")
      
    ) {
      sendResponseData(res, 200, false, "Input validation failed", {});
    }

    const quickLinkData = {
      page_url: req.body.page_url,
      title: req.body.title,
      quicklink_view_on: req.body.quicklink_view_on
    }
   // const updateData = await QuickLink.updateOne({ _id: linkId }, quickLinkData, { runValidators: true });
const updateData = await QuickLink.findOneAndUpdate({ _id: linkId }, {$set:quickLinkData}, { runValidators: true ,context: 'query', new:true});


    sendResponseData(res, 200, true, "QuickLink updated successfully", updateData);
  } catch (error) {
    await generateValidationErrorResponse(res, error);
  }
}

const quickLinkDelete = async (req, res) => {
  const linkId = req.params.id;
  console.log(linkId);
  try {
    if (linkId) {
      const updateData = await QuickLink.deleteOne({ '_id': linkId });

      sendResponseData(res, 200, true, "QuickLink deleted successfully", updateData);
    }

  } catch (error) {
    await generateValidationErrorResponse(res, error);
  }
}

const quickLinkUpdateStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const categoryData = await QuickLink.findOne({ _id: id });
    if (categoryData) {
      const updateDataField = {
        status: !categoryData.status,
      }
      // console.log(updateDataField);
      const updateData = await QuickLink.updateOne({ _id: id }, updateDataField);
      sendResponseData(res, 200, true, "Status updated successfully", updateData);
    }
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}

module.exports = { quickLinkList,quickLinkDetails,quickLinkAdd,quickLinkUpdate,quickLinkDelete,quickLinkUpdateStatus }
