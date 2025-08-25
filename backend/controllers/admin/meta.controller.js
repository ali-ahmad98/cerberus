const Meta = require("../../models/meta.model");
const { sendResponseData, getFilePath, generateValidationErrorResponse } = require("../../util/Utility");

const metaList = async (req, res) => {
  try {
    const metaList = await Meta.find().limit(20)
      .skip(0).sort({ _id: -1 });
    sendResponseData(res, 200, true, "Meta list", metaList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const metaAdd = async (req, res) => {
  try {

    const newMeta = new Meta({
      page_url: req.body.page_url,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keyword: req.body.meta_keyword,
    });

    const metaData = await newMeta.save();
    sendResponseData(res, 200, true, "Meta added successfully", metaData);
  } catch (error) {
    await generateValidationErrorResponse(res, error);
  }
}


const metaDetails = async (req, res) => {
  const metaId = req.params.id;
  try {
    const metaData = await Meta.findOne({ _id: metaId });
    sendResponseData(res, 200, true, "Meta data", metaData);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const metaUpdate = async (req, res) => {
  const metaId = req.body.id;
  try {
    if (
      !req.body.hasOwnProperty("id") ||
      !req.body.hasOwnProperty("page_url") ||
      !req.body.hasOwnProperty("meta_title") ||
      !req.body.hasOwnProperty("meta_description") ||
      !req.body.hasOwnProperty("meta_keyword")
    ) {
      sendResponseData(res, 200, false, "Input validation failed", {});
    }

    const metaData = {
      page_url: req.body.page_url,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keyword: req.body.meta_keyword,
    }
   // const updateData = await Meta.updateOne({ _id: metaId }, metaData, { runValidators: true });
const updateData = await Meta.findOneAndUpdate({ _id: metaId }, {$set:metaData}, { runValidators: true ,context: 'query', new:true});


    sendResponseData(res, 200, true, "Meta updated successfully", updateData);
  } catch (error) {
    await generateValidationErrorResponse(res, error);
  }
}

const metaDeleteBulk = async (req, res) => {
  const metaIds = req.body;
  console.log(metaIds);
  try {
    if (metaIds.length > 0) {
      const updateData = await Meta.deleteMany({ '_id': { '$in': metaIds } });

      sendResponseData(res, 200, true, "Meta deleted successfully", updateData);
    }

  } catch (error) {
    await generateValidationErrorResponse(res, error);
  }
}

module.exports = { metaList, metaAdd, metaDetails, metaUpdate, metaDeleteBulk }
