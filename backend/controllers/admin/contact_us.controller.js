const ContactUs = require("../../models/contact_us.model");
const { sendResponseData } = require("../../util/Utility");

const contactUsList = async (req, res) => {
    try{
        const contactUsList = await ContactUs.find().sort({ _id: -1 }); 
        sendResponseData(res, 200, true, "Contact us list", contactUsList);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const contactUsAdd = async (req, res) => { 
    try{
        const newContactUs = new ContactUs({
          name: req.body.name,
          email: req.body.email, 
          phone: req.body.phone, 
          phone: req.body.phone, 
          address: req.body.address,  
          message: req.body.message, 
          ip: req.socket.remoteAddress
        });
        const contactUsData = await newContactUs.save();
        sendResponseData(res, 200, true, "Contact us added successfully", contactUsData);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const contactUsDetails = async (req, res) => {
    const id = req.params.id;
    try{ 
        const contactUsData = await ContactUs.find({ _id: id }); 
        sendResponseData(res, 200, true, "Contact us data", contactUsData);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}

 

module.exports = { contactUsList, contactUsAdd, contactUsDetails }