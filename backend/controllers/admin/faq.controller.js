const Faq = require("../../models/faq.model");
const { sendResponseData,generateValidationErrorResponse } = require("../../util/Utility");

const faqList = async (req, res) => {
    try{
        const faqList = await Faq.find().sort({ _id: -1 }); 
        sendResponseData(res, 200, true, "FAQ list", faqList);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const faqAdd = async (req, res) => {
    try{
        const newFaq = new Faq({
          faq_question: req.body.faq_question,
          faq_ans_title: req.body.faq_ans_title, 
          faq_ans_description: req.body.faq_ans_description, 
        });
        const faqData = await newFaq.save();
        sendResponseData(res, 200, true, "FAQ added successfully", faqData);
  }catch(error){
        // sendResponseData(res, 200, false, "Error", error);
    await generateValidationErrorResponse(res, error);

  }
}


const faqDetails = async (req, res) => {
    const faqId = req.params.id;
    try{ 
        const faqData = await Faq.findOne({ _id: faqId }); 
        sendResponseData(res, 200, true, "FAQ data", faqData);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const faqUpdate = async (req, res) => {
    const faqId = req.body.id;
    try{ 
        if (
            !req.body.hasOwnProperty("id") ||
            !req.body.hasOwnProperty("faq_question") ||
            !req.body.hasOwnProperty("faq_ans_title") ||
            !req.body.hasOwnProperty("faq_ans_description")
          ) {
            sendResponseData(res, 200, false, "Input validation failed", {});
          }  
        const faqData = {
          faq_question: req.body.faq_question,
          faq_ans_title: req.body.faq_ans_title, 
          faq_ans_description: req.body.faq_ans_description, 
        }
        const updateData = await Faq.updateOne({ _id: faqId }, faqData, { runValidators: true }); 
        sendResponseData(res, 200, true, "FAQ updated successfully", updateData);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}

const faqUpdateStatus = async (req, res) => {
  const id = req.params.id;
  try{ 
      const faqData = await Faq.findOne({ _id: id }); 
      if(faqData){
        const updateDataField = {
          status: !faqData.status,
        }
        // console.log(updateDataField);
        const updateData = await Faq.updateOne({ _id: id }, updateDataField); 
        sendResponseData(res, 200, true, "Status updated successfully", updateData);
      }
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}

const faqDelete = async (req, res) => {
  const id = req.params.id;
  try{ 
      const dataRow = await Faq.findOne({ _id: id }); 
      if(dataRow){
        const deleteData = await dataRow.deleteOne({ _id: id }); 
        sendResponseData(res, 200, true, "Deleted successfully");
      }
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}

module.exports = { faqList, faqAdd, faqDetails, faqUpdate, faqUpdateStatus,
  faqDelete }