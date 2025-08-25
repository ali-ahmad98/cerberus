const Category = require("../../models/category.model");
const { sendResponseData, generateValidationErrorResponse } = require("../../util/Utility");

const categoryListDropdown = async (req, res) => {
  try {
    const categoryList = await Category.find({status: true, isDelete: false}).sort({ _id: 1 });
    sendResponseData(res, 200, true, "Category list", categoryList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}

const categoryListAll = async (req, res) => {
  try {
    const categoryList = await Category.find({}).sort({ _id: 1 });
    sendResponseData(res, 200, true, "Category list", categoryList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const CategoryAdd = async (req, res) => {
  try {
    const newCategory = new Category({
      title: req.body.title,
      permalink: req.body.permalink,
      meta_title: req.body.meta_title,
      meta_keyword: req.body.meta_keyword,
      meta_description: req.body.meta_description,
    });
    const categoryData = await newCategory.save();
    sendResponseData(res, 200, true, "Category added successfully", categoryData);
  } catch (error) {
    generateValidationErrorResponse(res, error);
  }
}


const categoryDetails = async (req, res) => {
  const cId = req.params.id;
  try {
    const categoryData = await Category.findOne({ _id: cId });
    sendResponseData(res, 200, true, "Category data", categoryData);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const categoryUpdate = async (req, res) => {
  const cId = req.body.id;
  try {
    if (
      !req.body.id ||
      !req.body.title
    ) {
      sendResponseData(res, 200, false, "Input validation failed", {});
    }
    const categoryData = {
      title: req.body.title,
      permalink: req.body.permalink,
      meta_title: req.body.meta_title,
      meta_keyword: req.body.meta_keyword,
      meta_description: req.body.meta_description,
    }
    //const updateData = await Category.updateOne({ _id: cId }, categoryData, { runValidators: true });
    const updateData = await Category.findOneAndUpdate({ _id: id }, {$set:categoryData}, { runValidators: true ,context: 'query', new:true});

    sendResponseData(res, 200, true, "Category updated successfully", updateData);
  } catch (error) {
    console.log("err", error);
    //sendResponseData(res, 200, false, "Error", error);
await generateValidationErrorResponse(res, error);
  }
}

const categoryUpdateStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const categoryData = await Category.findOne({ _id: id });
    if (categoryData) {
      const updateDataField = {
        status: !categoryData.status,
      }
      // console.log(updateDataField);
      const updateData = await Category.updateOne({ _id: id }, updateDataField);
      sendResponseData(res, 200, true, "Status updated successfully", updateData);
    }
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}

const categoryDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const dataRow = await Category.findOne({ _id: id });
    if (dataRow) {
      const deleteData = await Category.findOneAndUpdate({ _id: id }, { isDelete: true });
      sendResponseData(res, 200, true, "Deleted successfully");
    }
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}

module.exports = {
  categoryListDropdown, categoryListAll, CategoryAdd, categoryDetails,
  categoryUpdate, categoryUpdateStatus, categoryDelete
}
